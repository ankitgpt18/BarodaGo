import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:image/image.dart' as img;
import 'dart:io';
import 'dart:ui' as ui;
import 'package:flutter/rendering.dart';

class PhotoEditorScreen extends StatefulWidget {
  final File imageFile;

  const PhotoEditorScreen({super.key, required this.imageFile});

  @override
  State<PhotoEditorScreen> createState() => _PhotoEditorScreenState();
}

class _PhotoEditorScreenState extends State<PhotoEditorScreen> {
  File? _editedImage;
  double _brightness = 0;
  double _contrast = 1;
  double _saturation = 1;
  bool _isProcessing = false;

  @override
  void initState() {
    super.initState();
    _editedImage = widget.imageFile;
  }

  Future<void> _applyFilters() async {
    setState(() => _isProcessing = true);

    try {
      final bytes = await widget.imageFile.readAsBytes();
      img.Image? image = img.decodeImage(bytes);

      if (image != null) {
        // Apply brightness
        image = img.adjustColor(image, brightness: _brightness);
        
        // Apply contrast
        image = img.adjustColor(image, contrast: _contrast);
        
        // Apply saturation
        image = img.adjustColor(image, saturation: _saturation);

        // Save edited image
        final editedBytes = img.encodeJpg(image, quality: 90);
        final tempDir = Directory.systemTemp;
        final tempFile = File('${tempDir.path}/edited_${DateTime.now().millisecondsSinceEpoch}.jpg');
        await tempFile.writeAsBytes(editedBytes);

        setState(() {
          _editedImage = tempFile;
          _isProcessing = false;
        });
      }
    } catch (e) {
      print('Filter error: $e');
      setState(() => _isProcessing = false);
    }
  }

  Future<void> _cropImage() async {
    // TODO: Implement crop functionality using image_cropper package
  }

  Future<void> _rotateImage() async {
    setState(() => _isProcessing = true);

    try {
      final bytes = await (_editedImage ?? widget.imageFile).readAsBytes();
      img.Image? image = img.decodeImage(bytes);

      if (image != null) {
        image = img.copyRotate(image, angle: 90);

        final rotatedBytes = img.encodeJpg(image, quality: 90);
        final tempDir = Directory.systemTemp;
        final tempFile = File('${tempDir.path}/rotated_${DateTime.now().millisecondsSinceEpoch}.jpg');
        await tempFile.writeAsBytes(rotatedBytes);

        setState(() {
          _editedImage = tempFile;
          _isProcessing = false;
        });
      }
    } catch (e) {
      print('Rotate error: $e');
      setState(() => _isProcessing = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Edit Photo'),
        actions: [
          IconButton(
            icon: const Icon(Icons.check),
            onPressed: () => Navigator.pop(context, _editedImage),
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: _isProcessing
                ? const Center(child: CircularProgressIndicator())
                : Image.file(_editedImage ?? widget.imageFile, fit: BoxFit.contain),
          ),
          Container(
            padding: const EdgeInsets.all(16),
            color: Colors.black87,
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    IconButton(
                      icon: const Icon(Icons.rotate_right, color: Colors.white),
                      onPressed: _rotateImage,
                    ),
                    IconButton(
                      icon: const Icon(Icons.crop, color: Colors.white),
                      onPressed: _cropImage,
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                _buildSlider('Brightness', _brightness, -100, 100, (val) {
                  setState(() => _brightness = val);
                  _applyFilters();
                }),
                _buildSlider('Contrast', _contrast, 0.5, 2.0, (val) {
                  setState(() => _contrast = val);
                  _applyFilters();
                }),
                _buildSlider('Saturation', _saturation, 0, 2.0, (val) {
                  setState(() => _saturation = val);
                  _applyFilters();
                }),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSlider(String label, double value, double min, double max, Function(double) onChanged) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(color: Colors.white, fontSize: 12)),
        Slider(
          value: value,
          min: min,
          max: max,
          onChanged: onChanged,
          activeColor: Colors.blue,
        ),
      ],
    );
  }
}
