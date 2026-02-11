// **実装する機能**

// 1. 商品リストを表示（Week 2の商品データを使用）
// 2. 各商品に「カートに追加」ボタン
// 3. ボタンをクリックしたらカートに追加
// 4. カート内の商品一覧を表示
// 5. 合計金額を計算して表示

// **ゴール**

// - DOM操作で動的に要素を作成できる
// - イベントを使ってユーザーの操作に反応できる
// - 実際に動くカートの基礎ができている


// 商品リスト
const products = [
    { id: 1, name: "エチオピア イルガチェフェ", price: 1200, stock: 10 },
    { id: 2, name: "コロンビア スプレモ", price: 800, stock: 5 },
    { id: 3, name: "ブラジル サントス", price: 1500, stock: 0 },
    { id: 4, name: "グアテマラ アンティグア", price: 900, stock: 8 }
];

//product-list（商品リスト）の要素を取得する
const productList = document.querySelector("#product-list");
// 税率計算
function taxPrice(price){
    const tax = 1.1;
    return price * tax;
};

// 商品リストのデータをもとにprosuct-listに新しい要素を作成追加していく
productList.innerHTML = products
    .map((product) => {
        // 税込価格計算
        const priceTax = taxPrice(product.price);
        // 新しい要素を作成して返す
        return `
            <div class="product-list" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-stock="${product.stock}">
                <h2>${product.name}</h2>
                <p>${priceTax.toLocaleString()}円</p>
                <button class="btn">カートに追加</button>
            </div>
        `;
    })
    // 新しい要素通しをつなげる
    .join("");

// カートリストに追加
const cartLists = [];
const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const product = event.target.closest(".product-list");
        if (product.dataset.stock > 0) {
            cartLists.push({
                id: product.dataset.id,
                name: product.dataset.name,
                price: product.dataset.price
            });
            const cartItems = document.querySelector("#cart-items");
            cartItems.innerHTML = cartLists
                .map((cartList) => {
                    return `<li>${cartList.name}-${taxPrice(cartList.price).toLocaleString()}円</li>`;
                })
                .join("");
            const total = document.querySelector("#total");
            console.log(total);
            total.textContent = cartLists
                .reduce((sum, price) => {
                    return sum + Number(price.price);
                },0)
                .toLocaleString();
        } else {
            alert("在庫がありません");
            return cartLists;
        }
    });
}); 