/* ═══════════ PLACEHOLDER ═══════════ */
export const PLACEHOLDER = "data:image/svg+xml," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill="#e5e5e5"><rect width="400" height="400"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#999">No Image</text></svg>'
);

/* ═══════════ PRODUCTS ═══════════ */
export const DEFAULT_PRODUCTS = [
  { id:1, name:"Oi Vey T-shirt", price:100, cat:"t-shirts", gen:"men", vendor:"Apliiq", sizes:["S","M","L","XL","2XL"], colors:["Black"], feat:true, desc:"The Gildan 5000 Classic Tee. 100% cotton, pre-shrunk jersey knit." },
  { id:2, name:"No More Hate! T-shirt", price:100, cat:"t-shirts", gen:"men", vendor:"Apliiq", sizes:["S","M","L","XL","2XL"], colors:["Black"], feat:true, desc:"Spread love not hate. 100% cotton classic tee." },
  { id:3, name:"Ani Ledodi T-Shirt", price:100, cat:"t-shirts", gen:"men", vendor:"Apliiq", sizes:["S","M","L","XL","2XL"], colors:["Black","White"], feat:true, desc:"Ani Ledodi VeDodi Li." },
  { id:4, name:"Kosher Rap T Shirt", price:150, cat:"t-shirts", gen:"men", vendor:"Apliiq", sizes:["S","M","L","XL","2XL"], colors:["Black"], feat:true, desc:"Keep it kosher. Premium streetwear tee." },
  { id:5, name:"In God We Trust T-shirt", price:100, cat:"t-shirts", gen:"men", vendor:"Apliiq", sizes:["S","M","L","XL","2XL"], colors:["Black"], feat:true, desc:"In God We Trust. Classic fit cotton tee." },
  { id:6, name:"Blessed T-shirt", price:100, cat:"t-shirts", gen:"men", vendor:"Apliiq", sizes:["S","M","L","XL","2XL"], colors:["Black"], feat:true, desc:"Blessed. 100% cotton classic tee." },
  { id:7, name:"Pray T-Shirt", price:100, cat:"t-shirts", gen:"men", vendor:"Apliiq", sizes:["S","M","L","XL","2XL"], colors:["Navy","Black"], desc:"Pray. Premium cotton unisex tee." },
  { id:8, name:"Wild Etrog T-shirt", price:100, cat:"t-shirts", gen:"men", vendor:"Apliiq", sizes:["S","M","L","XL","2XL"], colors:["Navy"], desc:"Wild Etrog design. 100% cotton." },
  { id:9, name:"Black Cat Jew T-shirt", price:100, cat:"t-shirts", gen:"men", vendor:"Apliiq", sizes:["S","M","L","XL","2XL"], colors:["Grey","Charcoal"], desc:"Black Cat Jew. Tri-blend comfortable tee." },
  { id:10, name:"No Haman T-shirt", price:100, cat:"t-shirts", gen:"men", vendor:"Apliiq", sizes:["S","M","L","XL","2XL"], colors:["Navy","Green"], desc:"No Haman. Purim-themed classic tee." },
  { id:11, name:"Happy Purim T-shirt", price:100, cat:"t-shirts", gen:"men", vendor:"Apliiq", sizes:["S","M","L","XL","2XL"], colors:["Navy"], desc:"Happy Purim! Classic cotton tee." },
  { id:12, name:"Shomer Shabbat T-shirt", price:100, cat:"t-shirts", gen:"men", vendor:"Tzadik", sizes:["S","M","L","XL","2XL"], colors:["Black"], desc:"Shomer Shabbat. Premium quality tee." },
  { id:13, name:"LeChaim Start Tee", price:120, cat:"t-shirts", gen:"men", vendor:"Tzadik", sizes:["S","M","L","XL"], colors:["Black"], desc:"LeChaim! To life. Premium cotton tee." },
  { id:14, name:"Tree of Life T-Shirt", price:100, cat:"t-shirts", gen:"men", vendor:"Apliiq", sizes:["S","M","L","XL","2XL"], colors:["Black"], desc:"Tree of Life design. Classic cotton tee." },
  { id:15, name:"Tzadik Tank Top", price:120, cat:"t-shirts", gen:"men", vendor:"Tzadik", sizes:["S","M","L","XL"], colors:["Black"], desc:"Tzadik branded tank top." },
  { id:16, name:"Head Not Tail Button-Down", price:225, cat:"t-shirts", gen:"men", vendor:"Tzadik", sizes:["S","M","L","XL"], colors:["Black/White"], desc:"Premium button-down shirt." },
  { id:17, name:"Tzadika Crop Hoodie", price:200, cat:"hoodies", gen:"women", vendor:"Tzadik", sizes:["S","M","L","XL"], colors:["Black"], feat:true, desc:"Tzadika crop hoodie for women." },
  { id:18, name:"Jerusalem Hoodie", price:250, cat:"hoodies", gen:"men", vendor:"Tzadik", sizes:["S","M","L","XL"], colors:["Black"], feat:true, desc:"Jerusalem hoodie. Premium quality." },
  { id:19, name:"Shalom Ivy League Hoody", price:310, cat:"hoodies", gen:"men", vendor:"Tzadik", sizes:["S","M","L","XL"], colors:["Black"], desc:"Shalom Ivy League style hoodie." },
  { id:20, name:"Tree of Life Scuba Hoodie", price:240, cat:"hoodies", gen:"men", vendor:"Tzadik", sizes:["S","M","L","XL"], colors:["Black"], desc:"Tree of Life monochrome scuba hoodie." },
  { id:21, name:"Tachles Sweatshirt", price:200, cat:"hoodies", gen:"men", vendor:"Tzadik", sizes:["S","M","L","XL"], colors:["Black"], desc:"Tachles sweatshirt." },
  { id:22, name:"Shomer Shabbath Bomber Jacket", price:280, cat:"jacket", gen:"men", vendor:"Tzadik", sizes:["S","M","L","XL"], colors:["Navy"], desc:"Shomer Shabbath bomber jacket." },
  { id:23, name:"Light Embossed Sweater", price:220, cat:"hoodies", gen:"women", vendor:"Tzadik", sizes:["S","M","L","XL"], colors:["White"], desc:"Light embossed women sweater." },
  { id:24, name:"Saint Cap", price:100, cat:"caps", gen:"unisex", vendor:"Tzadik", sizes:["One Size"], colors:["Black"], desc:"Saint cap. Adjustable." },
  { id:25, name:"Tzadik Cap", price:100, cat:"caps", gen:"unisex", vendor:"Tzadik", sizes:["One Size"], colors:["Black"], desc:"Tzadik branded cap." },
  { id:26, name:"Tzadik Orange Beanie", price:150, cat:"beanies", gen:"unisex", vendor:"Tzadik", sizes:["One Size"], colors:["Orange"], feat:true, desc:"Fluorescent orange beanie." },
  { id:27, name:"Tachles Skateboard", price:500, cat:"skateboards", gen:"unisex", vendor:"Tzadik", sizes:["One Size"], colors:["Default"], feat:true, desc:"Tachles skateboard deck." },
  { id:28, name:"Black Cat Jew Skateboard", price:400, cat:"skateboards", gen:"unisex", vendor:"Tzadik", sizes:["One Size"], colors:["Default"], desc:"Black Cat Jew skateboard deck." },
  { id:29, name:"Gam Zu Letova Bag", price:70, cat:"bags", gen:"unisex", vendor:"Tzadik", sizes:["One Size"], colors:["Black"], feat:true, desc:"Gam Zu Letova tote bag." },
  { id:30, name:"Happy Purim Sticker", price:15, cat:"stickers", gen:"unisex", vendor:"Tzadik", sizes:["3x3","4x4","5.5x5.5"], colors:["White"], desc:"Happy Purim kiss-cut sticker." },
  { id:31, name:"No Haman Sticker", price:15, cat:"stickers", gen:"unisex", vendor:"Tzadik", sizes:["3x3","4x4","5.5x5.5"], colors:["White"], desc:"No Haman kiss-cut sticker." },
];

export const ORDERS = [
  { id:"TZK-1001", customer:"David Cohen", email:"david@example.com", items:[{pid:1,qty:2,size:"L"},{pid:26,qty:1,size:"One Size"}], total:350, status:"delivered", date:"2026-03-10", address:"42 King George St, Tel Aviv", phone:"+972-50-1234567" },
  { id:"TZK-1002", customer:"Sarah Levi", email:"sarah@example.com", items:[{pid:17,qty:1,size:"M"}], total:200, status:"shipped", date:"2026-03-11", address:"15 Ben Yehuda St, Jerusalem", phone:"+972-52-9876543" },
  { id:"TZK-1003", customer:"Moshe Goldstein", email:"moshe@example.com", items:[{pid:27,qty:1,size:"One Size"},{pid:4,qty:1,size:"XL"}], total:650, status:"processing", date:"2026-03-12", address:"8 Rothschild Blvd, Tel Aviv", phone:"+972-54-5551234" },
  { id:"TZK-1004", customer:"Rachel Green", email:"rachel@example.com", items:[{pid:5,qty:3,size:"S"}], total:300, status:"pending", date:"2026-03-12", address:"22 Herzl St, Haifa", phone:"+972-53-7778899" },
  { id:"TZK-1005", customer:"Avi Shapiro", email:"avi@example.com", items:[{pid:18,qty:1,size:"L"},{pid:24,qty:1,size:"One Size"},{pid:29,qty:2,size:"One Size"}], total:490, status:"delivered", date:"2026-03-08", address:"5 Dizengoff St, Tel Aviv", phone:"+972-58-3334455" },
  { id:"TZK-1006", customer:"Yael Ben-Ari", email:"yael@example.com", items:[{pid:23,qty:1,size:"M"},{pid:2,qty:1,size:"S"}], total:320, status:"shipped", date:"2026-03-09", address:"30 Emek Refaim, Jerusalem", phone:"+972-50-6667788" },
  { id:"TZK-1007", customer:"Noam Peretz", email:"noam@example.com", items:[{pid:28,qty:1,size:"One Size"}], total:400, status:"processing", date:"2026-03-11", address:"12 Allenby St, Tel Aviv", phone:"+972-52-1112233" },
  { id:"TZK-1008", customer:"Tamar Mizrahi", email:"tamar@example.com", items:[{pid:6,qty:2,size:"M"},{pid:30,qty:4,size:"4x4"}], total:260, status:"delivered", date:"2026-03-05", address:"7 Jaffa St, Jerusalem", phone:"+972-54-4445566" },
];

export const NAV = [
  { label:"Home", path:"home" },
  { label:"Men Clothes", path:"men", children:[
    {label:"T-shirts",filter:{cat:"t-shirts",gen:"men"}},
    {label:"Hoodies",filter:{cat:"hoodies",gen:"men"}},
    {label:"Jacket",filter:{cat:"jacket",gen:"men"}},
    {label:"Caps",filter:{cat:"caps"}},
    {label:"Beanies",filter:{cat:"beanies"}},
  ]},
  { label:"Women Clothes", path:"women", children:[
    {label:"T-shirts",filter:{cat:"t-shirts",gen:"women"}},
    {label:"Hoodies",filter:{cat:"hoodies",gen:"women"}},
    {label:"Caps",filter:{cat:"caps"}},
    {label:"Beanies",filter:{cat:"beanies"}},
  ]},
  { label:"Accessories", path:"acc", children:[
    {label:"Bags",filter:{cat:"bags"}},
    {label:"Stickers",filter:{cat:"stickers"}},
  ]},
  { label:"Skateboards", path:"sk8", filter:{cat:"skateboards"} },
  { label:"Contact Us", path:"contact" },
];

export const STS = {
  pending:   { bg:"#FEF3C7", fg:"#92400E", label:"Pending" },
  processing:{ bg:"#DBEAFE", fg:"#1E40AF", label:"Processing" },
  shipped:   { bg:"#E9D5FF", fg:"#6B21A8", label:"Shipped" },
  delivered: { bg:"#D1FAE5", fg:"#065F46", label:"Delivered" },
  cancelled: { bg:"#FEE2E2", fg:"#991B1B", label:"Cancelled" },
};

export const HERO_IMGS = [
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=600&fit=crop",
  "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1200&h=600&fit=crop",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=600&fit=crop",
];

export const GALLERY = [
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
];

export const CATS = [
  { l:"T-shirts", img:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop", f:{cat:"t-shirts",gen:"men"} },
  { l:"Caps", img:"https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=400&h=400&fit=crop", f:{cat:"caps"} },
  { l:"Skateboards", img:"https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=400&h=400&fit=crop", f:{cat:"skateboards"} },
];

export const TRUST = [
  { icon:"card", t:"Safe Payment", s:"All types through PayPal." },
  { icon:"truck", t:"Fast Delivery", s:"Worldwide via UPS." },
  { icon:"return", t:"30-day Return", s:"Within 30 days from receipt." },
];
