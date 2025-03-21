let text = document.getElementById("text").innerHTML;

document.writeln("Паролі<br>")

for (password_match of Array.from(text.matchAll(/(password|пароль): <b>(.*?)<\/b>/g))){
    document.writeln(`${password_match[0]}<br>`)
}

