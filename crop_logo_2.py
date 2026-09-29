from PIL import Image

img = Image.open("C:/Users/Usuario/Documents/Xiembra/02_Identidad_y_Diseno/1. Logos Oficiales/Manual y Renders JPG/Pagina_04_Logo_Horizontal_Verde_Nature.jpg")
img = img.convert("RGB")
w, h = img.size
left, right, top, bottom = w, 0, h, 0
datas = img.getdata()
for y in range(h):
    for x in range(w):
        r, g, b = datas[y * w + x]
        if not (r > 240 and g > 240 and b > 240):
            if x < left: left = x
            if x > right: right = x
            if y < top: top = y
            if y > bottom: bottom = y

if left < right and top < bottom:
    cropped = img.crop((left, top, right, bottom))
    cropped.save("public/logo_verde_nature.jpg")
    print(f"Cropped Verde Nature logo to {right-left}x{bottom-top}.")
else:
    print("Could not find crop boundaries.")

