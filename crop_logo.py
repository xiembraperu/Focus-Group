from PIL import Image

img = Image.open("C:/Users/Usuario/Documents/Xiembra/02_Identidad_y_Diseno/1. Logos Oficiales/Manual y Renders JPG/Pagina_02_Logo_Horizontal_Verde_Campo.jpg")
img = img.convert("RGB")

w, h = img.size
# Find bounding box of the green background.
# Verde Campo is #006148 (R:0, G:97, B:72), let's assume it's roughly R<50, G>50, B<100.
# Or better, just find any pixel that is NOT white or close to white.
left = w
right = 0
top = h
bottom = 0

datas = img.getdata()
for y in range(h):
    for x in range(w):
        r, g, b = datas[y * w + x]
        # If it's not white-ish (margins of a manual PDF export)
        if not (r > 240 and g > 240 and b > 240):
            if x < left: left = x
            if x > right: right = x
            if y < top: top = y
            if y > bottom: bottom = y

if left < right and top < bottom:
    cropped = img.crop((left, top, right, bottom))
    cropped.save("public/logo_verde_campo.jpg")
    print(f"Cropped Verde Campo logo to {right-left}x{bottom-top}.")
else:
    print("Could not find crop boundaries.")

