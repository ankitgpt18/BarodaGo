import { GeoCoordinate, WardBoundary } from '../models/types.js';
import { VADODARA_WARDS_DATA } from '../data/vadodaraWardsGeo.js';

export class SpatialService {
  /**
   * Earth's mean radius in meters.
   */
  private static readonly EARTH_RADIUS_METERS = 6371000;

  /**
   * Calculate great-circle distance between two GPS points using the Haversine formula.
   * Accurate to millimeter precision on WGS84 ellipsoid for city-scale distances.
   */
  public static haversineDistanceMeters(
    pointA: GeoCoordinate,
    pointB: GeoCoordinate
  ): number {
    const lat1Rad = (pointA.latitude * Math.PI) / 180;
    const lat2Rad = (pointB.latitude * Math.PI) / 180;
    const deltaLat = ((pointB.latitude - pointA.latitude) * Math.PI) / 180;
    const deltaLng = ((pointB.longitude - pointA.longitude) * Math.PI) / 180;

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(deltaLng / 2) *
        Math.sin(deltaLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return this.EARTH_RADIUS_METERS * c;
  }

  /**
   * Point-in-polygon test using ray-casting algorithm.
   * Determines whether coordinate (lat, lng) lies inside the polygon vertices.
   */
  public static isPointInPolygon(
    point: GeoCoordinate,
    polygon: Array<[number, number]>
  ): boolean {
    let inside = false;
    const x = point.latitude;
    const y = point.longitude;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0];
      const yi = polygon[i][1];
      const xj = polygon[j][0];
      const yj = polygon[j][1];

      const intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

      if (intersect) {
        inside = !inside;
      }
    }

    return inside;
  }

  /**
   * Resolves the exact Vadodara Municipal Corporation (VMC) Ward (1-19) for a GPS coordinate.
   * If point is slightly outside defined polygons, falls back to nearest ward centroid.
   */
  public static resolveWardForCoordinates(coords: GeoCoordinate): WardBoundary {
    // 1. Precise Ray-Casting Point-in-Polygon check
    for (const ward of VADODARA_WARDS_DATA) {
      if (this.isPointInPolygon(coords, ward.polygon)) {
        return ward;
      }
    }

    // 2. Fallback: Nearest Ward Centroid (handling border roads / flyovers)
    let nearestWard = VADODARA_WARDS_DATA[0];
    let minDistance = Infinity;

    for (const ward of VADODARA_WARDS_DATA) {
      const centroidLat =
        ward.polygon.reduce((acc, p) => acc + p[0], 0) / ward.polygon.length;
      const centroidLng =
        ward.polygon.reduce((acc, p) => acc + p[1], 0) / ward.polygon.length;

      const dist = this.haversineDistanceMeters(coords, {
        latitude: centroidLat,
        longitude: centroidLng
      });

      if (dist < minDistance) {
        minDistance = dist;
        nearestWard = ward;
      }
    }

    return nearestWard;
  }

  /**
   * High-scale spatial deduplication:
   * Checks if an identical civic defect has already been reported within a threshold distance
   * (default 25 meters) in the active candidate pool.
   */
  public static findSpatialDuplicate(
    newCoords: GeoCoordinate,
    category: string,
    existingIncidents: Array<{
      id: string;
      trackingNumber: string;
      category: string;
      coordinates: GeoCoordinate;
      state: string;
    }>,
    thresholdMeters = 25
  ): { isDuplicate: boolean; matchedIncidentId?: string; trackingNumber?: string; distanceMeters?: number } {
    for (const incident of existingIncidents) {
      // Only match unresolved or active tickets of the same defect category
      if (
        incident.category === category &&
        incident.state !== 'resolved' &&
        incident.state !== 'rejected'
      ) {
        const distance = this.haversineDistanceMeters(
          newCoords,
          incident.coordinates
        );

        if (distance <= thresholdMeters) {
          return {
            isDuplicate: true,
            matchedIncidentId: incident.id,
            trackingNumber: incident.trackingNumber,
            distanceMeters: Math.round(distance * 10) / 10
          };
        }
      }
    }

    return { isDuplicate: false };
  }
}
