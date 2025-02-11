from PIL import Image, ImageDraw

# Create a blank transparent image
img = Image.new('RGBA', (800, 600), (255, 255, 255, 0))

# Optional: Add a light watermark or pattern
draw = ImageDraw.Draw(img)
draw.text((300, 250), "Event Collage", fill=(128, 128, 128, 64))

# Save the image
img.save('event-collage.png')
