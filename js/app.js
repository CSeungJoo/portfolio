const commandList = ["ls", "pwd", "cat", "cd", "clear"];
const rootDir = {
    "name": "root",
    "profile": {
        "name": "profile"
    },
    "education": {
        "name": "education"
    },
    "project": {
        "name": "project"
    },
    "etc": {
        "name": "etc"
    },
    "selfIntroduction": {
        "name": "selfIntroduction"
    }
}

let currentDir = "/root"

const fetchData = async () => {
}

const commandSubmit = () => {
    let commandInput =  document.getElementById("commandInput");
    const command = commandInput.value.split(" ")[0];
    const arg = commandInput.value.split(" ")[1];
    if(!isValidCommand(command)) {
        document.getElementById("commandLine").innerHTML += `<p>[root@localhost ~/${currentDir.split("/").reverse()[0]}] invalid command</p>`
        document.getElementById("commandSubmit").innerText = " "
        return;
    }
    
    commandExcute(command, arg);
    document.getElementById("commandSubmit").innerText = ""
}

const pwd = () => {
    document.getElementById("commandLine").innerHTML += `<p>[root@localhost ~/${currentDir.split("/").reverse()[0]}] ${currentDir}</p>`
}

const clear = () => {
    document.getElementById("commandLine").innerHTML = `<p>[root@localhost ~/${currentDir.split("/").reverse()[0]}] </p>`
}

const cd = (moveDir) => {
    let node = getDir(moveDir);
    if(node === false) {
        document.getElementById("commandLine").innerHTML += `<p>[root@localhost ~/${currentDir.split("/").reverse()[0]}] invalid dilegtoli</p>`;
        return;
    }
    currentDir += "/"+ moveDir
    document.getElementById("commandLine").innerHTML += `<p>[root@localhost ~/${currentDir.split("/").reverse()[0]}]</p>`
}

const cat = (fileName) => {
    let node = getDir(currentDir.split("/").reverse()[0])
    for (const key in node) {
        if(fileName == key && fileName.split(".")[1] != undefined) {
            document.getElementById("commandLine").innerHTML += `<p>[root@localhost ~/${currentDir.split("/").reverse()[0]}] <br>${node[key]}`
        }
    }
    document.getElementById("commandLine").innerHTML += `<p>[root@localhost ~/${currentDir.split("/").reverse()[0]}] file not found</p>`;
}

const getDir = (dirName) => {
    const queue = [rootDir];

  while (queue.length > 0) {
    const node = queue.shift();
    if(node.name == dirName)
        return node;

    for (const key in node) {
        if(key != "name" && key == dirName)
            return node.key;
        if(node[key] != undefined)
            queue.push(node[key])
    }
  }
  return false;
}

const ls = () => {
    let dir = currentDir.split("/").reverse()[0]
    let drow = `<p>[root@localhost ~/${dir}]`;

    const dirJson = getDir(dir);
    for (const key in dirJson) {
        drow += " "+ key +" "
    }
    drow += "</p>";

    document.getElementById("commandLine").innerHTML += drow;
}

const commandExcute = (command, arg) => {
    switch(command) {
        case "ls":
            ls();
            break;
        case "pwd":
            pwd();
            break;
        case "cat":
            cat(arg);
            break;
        case "cd":
            cd(arg);
            break;
        case "clear":
            clear();
            break;
    }
}



const isValidCommand = (command) => {
    for (let i = 0; i < commandList.length; i++) {
        if(command == commandList[i]) {
            return true;
        }
    }
    return false;
}

document.getElementById("commandSubmit").addEventListener("click", commandSubmit)