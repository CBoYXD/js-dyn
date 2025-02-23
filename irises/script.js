let total = 0;

/** 
 @param {Event} event - The input event object.
*/
function allowDrop(event) {
  event.preventDefault();
}

/** 
 @param {Event} event - The input event object.
*/
function onInput(event) {
  imgTargetId = event.target.id.split("_")[0];
  console.log(imgTargetId);
  imgTarget = document.getElementById(imgTargetId);
  imgTarget.dataset.count = parseInt(event.target.value);
  console.log(event.target.value);
  console.log(imgTarget);
}

/** 
 @param {Event} event - The input event object.
*/
function drag(event) {
  event.dataTransfer.setData(
    "text",
    '<img src="http://js.web-online.net.ua/' +
      event.target.id +
      '.jpg" class="mini" />' +
      "," +
      event.target.dataset.text +
      "," +
      event.target.dataset.price +
      "," +
      event.target.dataset.count +
      "," +
      event.target.id
  );
}

/** 
 @param {Event} event - The input event object.
*/
function drop(event) {
  event.preventDefault();
  const drop = document.getElementById("cart");
  const data = event.dataTransfer.getData("text");
  const arrData = data.split(",");
  const sum = document.getElementById("sum");
  const price = parseInt(arrData[2]);
  const count = parseInt(arrData[3]);
  const itemId = arrData[4];
  console.log(`Price: ${price}`);
  console.log(`Count: ${count}`);

  const existingItem = document.getElementById(`count_${itemId}`);
  if (existingItem) {
    const newCount = parseInt(existingItem.getAttribute("value")) + count;
    console.log(`New count: ${newCount}`);
    total += parseInt(newCount) * parseInt(price);
    sum.innerHTML = "Сумма: $" + total;
    existingItem.innerHTML = `<strong>Кількість: ${newCount}</strong>`;
    existingItem.setAttribute("value", newCount);
    return
  }

  total += parseInt(count) * parseInt(price);
  sum.innerHTML = "Сумма: $" + total;
  drop.innerHTML +=
    arrData[0] +
    "<strong>" +
    arrData[1] +
    ", $" +
    price +
    "</strong>" +
    "<br>" +
    `<span value=${count} id="count_${itemId}"><strong>Кількість: ${count}</strong></span>`;
}
