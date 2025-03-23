function magnify(imgID, zoom) {
    let img, glass, w, h;
    img = document.getElementById(imgID);
    let glassBox = document.getElementById("glass_box");

    /*создать увеличительное стекло:*/
    glass = document.createElement("DIV");
    glass.setAttribute("class", "glass_hidden");

    /* вставити збільшувальне скло перед картинкою: */
    img.parentElement.insertBefore(glass, img);

    /* встановити стилі для background для збільшувального скла: */
    glassBox.style.backgroundImage = "url('" + img.src + "')";
    glassBox.style.backgroundRepeat = "no-repeat";
    glassBox.style.backgroundSize =
    img.width * zoom + "px " + img.height * zoom + "px";

    /* знайти половину ширини та висоти скла */
    w = glass.style.width / 2;
    h = glass.style.height / 2;

    /* обробка події переміщення миші */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);

    /* переміщення збільшувального скла */
    function moveMagnifier(event) {
        let x, y;

        /* запобігти дії за умовчанням */
        event.preventDefault();

        /* отримати координати курсора */
        x = event.offsetX;
        y = event.offsetY;

        /* запобігти позиціювання скла далеко від картинки */
        if (x > img.width - w / zoom) {
          x = img.width - w / zoom;
        }
        if (x < w / zoom) {
          x = w / zoom;
        }
        if (y > img.height - h / zoom) {
          y = img.height - h / zoom;
        }
        if (y < h / zoom) {
          y = h / zoom;
        }

        /* поміняти позиціонування скла за координатами миші: */
        glass.style.left = x - w + "px";
        glass.style.top = y - h + "px";

        /* позиціонування фону */
        glassBox.style.backgroundPosition =
        "-" + (x * zoom - w) + "px -" + (y * zoom - h) + "px";
    }
}

magnify("picture", 3);