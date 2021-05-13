const $title = document.querySelector("#product_title");
const $origin_prs = document.querySelector("#product_origin_prs");
const $prs = document.querySelector("#product_prs");
const $addBtn = document.querySelector("[data-addInfo]");
const $products_list = document.querySelector("[data-productsList]");
const clearIcon = "https://raw.githubusercontent.com/yuu-chien/woof-fitting/a9453030325e75043809b8f1feeed0d50a7f1b43/content/images/icon/clear.svg";

// 1. 新增產品時，會將前幾筆產品覆蓋成同樣的內容。
// 2. 刪除所有產品後再新增，會跳出前面應該被刪除掉的產品。應該將 all_products 清空，而非清除 DOM 。
// 3. 刪除單筆同上，應該將產品陣列中的該筆物件刪除，而非刪除 DOM 。
// 4. tempData 中要有個布林值，用來表示否啟用產品。 目前雖然畫面上有切換效果、但實際資料上並沒有做切換。

let all_products = [];

// 將資料渲染至列表
function renderList() {
    let str = "";

    all_products.forEach((item, index) => {
        str = `
        <tr data-product-id="${item.id}">
            <td class="c-table__td">${item.name}</td>
            <td class="c-table__td">${item.origin_prs}</td>
            <td class="c-table__td">${item.prs}</td>
            <td class="c-table__td">
                <div class="o-radioSwt">
                    <label class="o-radioSwt__item">
                        <input type="radio" class="o-radioSwt__input" name="onSale_${index}" checked />
                        <span class="o-radioSwt__text">YES</span>
                    </label>
                    <label class="o-radioSwt__item">
                        <input type="radio" class="o-radioSwt__input" name="onSale_${index}" />
                        <span class="o-radioSwt__text">NO</span>
                    </label>
                </div>
            </td>
            <td class="c-table__td">
                <a href="#" data-delete="${item.id}">
                    <img src="${clearIcon}" alt="" />
                </a>
            </td>
        </tr>
        `;
    });
    $products_list.innerHTML += str;

    // 清空輸入欄位
    $title.value = "";
    $origin_prs.value = "";
    $prs.value = "";
}

// 新增產品
$addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let tempData = {
        id: 0,
        name: "",
        origin_prs: "",
        prs: "",
    };
    if (all_products.length !== "") {
        let title = $title.value;
        let origin_prs = $origin_prs.value;
        let prs = $prs.value;
        tempData.id = Math.floor(Date.now());
        tempData.name = title;
        tempData.origin_prs = origin_prs;
        tempData.prs = prs;

        all_products.push(tempData);
        renderList();
        delInfo();
    }
});

// 刪除單筆資料
function delInfo() {
    let $deleteBtns = document.querySelectorAll("[data-delete]");

    $deleteBtns.forEach((delBtn) => {
        delBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let product_id = delBtn.getAttribute("data-delete");
            let newIndex = 0;
            console.log("product_id", product_id);

            all_products.forEach((goods, key) => {
                if (product_id == goods.id) {
                    newIndex = key;
                    all_products.splice(newIndex, 1);
                    console.log(all_products);
                    renderList();
                }
            });
        });
    });
}

// 刪除全部資料
const $emptyAllBtn = document.querySelector("[data-empty-all]");
$emptyAllBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(all_products);
    all_products = [];
    renderList();
});
