import base64

# Function to encode the image file to base64
def image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    return encoded_string

# Function to create an SVG with the embedded base64 image
def create_svg_with_base64(image_base64, svg_path):
    svg_data = f'''<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <image href="data:image/png;base64,{image_base64}" x="0" y="0" height="100%" width="100%"/>
</svg>'''
    with open(svg_path, "w") as svg_file:
        svg_file.write(svg_data)

# Path to your PNG image
png_image_path = 'image.png'
# Path where you want to save the SVG file
svg_output_path = 'image.svg'

# Convert image to base64
base64_image = image_to_base64(png_image_path)
# Create SVG with the base64 image data
create_svg_with_base64(base64_image, svg_output_path)
