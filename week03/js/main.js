import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

const app = createApp({
    data() {
        return {
            api: "https://vue3-course-api.hexschool.io/api",
            path: "yu-for-test",
            products: [],
            temp_prod: {
                imagesUrl: ""
            },
        }
    },
    mounted() {
        // replace 中的 token 為自定義之名稱；若為作業用 hexToken 這個名稱需改為以下這行
        // const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common['Authorization'] = token;
        this.getProducts();
    },
    methods: {
        // 取得產品列表
        getProducts() {
            const url = `${this.api}/${this.path}/admin/products/all`;
            axios.get(url)
                .then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        this.products = res.data.products;
                    }
                })
        },
        // 登出
        signOut() {
            const url = "https://vue3-course-api.hexschool.io/logout";
            axios.post(url)
                .then((res) => {
                    console.log(res);
                    window.location = 'sign-in.html';
                })
        },
    }
});

app.mount("#app");