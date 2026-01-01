console.log("购买泡面系统")

const noodles_FileList = [
    {
        id: "茄皇",
        noodle_name: "番茄鸡蛋面"
    },
    {
        id: "白象1",
        noodle_name: "咸蛋黄火鸡面"
    },
    {
        id: "白象2",
        noodle_name: "老母鸡汤面"
    },
    {
        id: "国圆",
        noodle_name: "辣白菜拌面"
    },
    {
        id: "三养",
        noodle_name: "奶油火鸡面"
    }
]

let noodleList = [];
let editIndex = -1;

function addNoodle() {
    const input = document.getElementById('noodleInput');
    const name = input.value.trim();
    if (!name) {
        alert('请输入泡面名称！');
        return;
    }
    if (editIndex === -1) {
        noodleList.push(name);
    } else {
        noodleList[editIndex] = name;
        editIndex = -1;
        document.querySelector('.input-area button').innerText = '添加泡面';
    }
    input.value = '';
    renderTable();
}
function renderTable() {
    const table = document.getElementById('noodleTable');
    table.innerHTML = '';
    noodleList.forEach((noodle, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${noodle}</td>
                    <td>
                        <button class="edit-btn" onclick="editNoodle(${index})">修改</button>
                        <button class="delete-btn" onclick="deleteNoodle(${index})">删除</button>
                    </td>
                `;
        table.appendChild(tr);
    });
}
function editNoodle(index) {
    editIndex = index;
    const input = document.getElementById('noodleInput');
    input.value = noodleList[index];
    document.querySelector('.input-area button').innerText = '确认修改';
}
function deleteNoodle(index) {
    if (confirm('确定要删除这个泡面吗？')) {
        noodleList.splice(index, 1);
        renderTable();
    }
}
function searchNoodle() {
    const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();
    const filteredList = noodleList.filter(noodle => noodle.toLowerCase().includes(searchValue));

    const table = document.getElementById('noodleTable');
    table.innerHTML = '';
    filteredList.forEach((noodle) => {
        const index = noodleList.indexOf(noodle);

        if (index === -1) return;

        const tr = document.createElement('tr');
        tr.innerHTML = `
                     <td>${index + 1}</td>
                     <td>${noodle}</td>
                     <td>
                         <button class="edit-btn" onclick="editNoodle(${index})">修改</button>
                         <button class="delete-btn" onclick="deleteNoodle(${index})">删除</button>
                     </td>
                 `;
        table.appendChild(tr);
    });
}

function initPage() {
    const grid = document.getElementById('product-picture');

    noodles_FileList.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const placeholderImg = `picture/${item.id}.jpg`;

        card.innerHTML = `
                    <img src="${placeholderImg}" 
                         alt="${item.noodle_name}" 
                         class="product-img" 
                         id="img-${item.id}"
                         onerror="this.src='https://picsum.photos/seed/${item.id}/200/200'">
                    <div class="product-info">
                        <div class="product-name">${item.noodle_name}</div>
                        <button class="add-btn" onclick="add_clothes('${item.id}')">加入购物车</button>
                    </div>
                `;
        grid.appendChild(card);
    });

    renderCart();
}

function add_clothes(id) {
    const targetProduct = noodles_FileList.find(item => item.id === id);

    if (targetProduct) {
        editIndex = -1;
        document.querySelector('.input-area button').innerText = '添加泡面';
        document.getElementById('noodleInput').value = '';

        noodleList.push(targetProduct.noodle_name);

        renderTable();

        console.log(`已添加: ${targetProduct.noodle_name}`);
    } else {
        console.error("未找到ID为 " + id + " 的商品");
    }
}

function renderCart() {
    renderTable();
}

window.onload = initPage;
