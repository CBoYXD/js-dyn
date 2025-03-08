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
  const count = parseInt(event.target.value);
  const price = imgTarget.dataset.price;
  const oldSum = imgTarget.dataset.count * imgTarget.dataset.price;
  imgTarget.dataset.count = count;
  console.log(event.target.value);
  console.log(imgTarget);
  const sum = document.getElementById("sum");
  total += parseInt(count) * parseInt(price) - oldSum;
  console.log(`Total: ${total}`);
  sum.innerHTML = "Сумма: $" + total;
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
  // const count = parseInt(arrData[3]);
  const itemId = arrData[4];
  console.log(`Price: ${price}`);
  // console.log(`Count: ${count}`);

  const existingItem = document.getElementById(`${itemId}_input`);
  if (existingItem) {
    console.log(`Existing count: ${existingItem.value}`);
    let newCount = parseInt(existingItem.value)+1;
    console.log(`New count: ${newCount}`);
    total += parseInt(price);
    sum.innerHTML = "Сумма: $" + total;
    existingItem.value = newCount;
    return
  }

  total += parseInt(price);
  sum.innerHTML = "Сумма: $" + total;
  drop.insertAdjacentHTML(
    "beforeend",
    arrData[0] +
    "<strong>" +
    arrData[1] +
    ", $" +
    price +
    "</strong>" +
    "<br>" +
    `<input id="${itemId}_input" type="number" value="1" oninput="onInput(event)" min="1"/>`
  );
}
