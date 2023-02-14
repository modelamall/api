"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [
      {
        title: "Apple iPhone 14 Pro",
        discription: `Marka: Apple
Ürün ailesi: iPhone
Ürün serisi: 14 Pro
Ürün adı: iPhone 14 Pro
Ürün kodu: MQ0T3TU/A
EAN/UPC kodu: 0194253402459 
194253402459
15,5 cm (6.1") 2556 x 1179 Piksel OLED Ceramic Shield
Apple A16
256 GB
5G Çift SIM NanoSIM + eSIM
Wi-Fi 6 (802.11ax) Bluetooth 5.3 Yakın Alan İletişimi
Üçlü kamera 48 MP 12 MP 12 MP
Lityum-İyon (Li-Ion) Kablosuz şarj olma
iOS 16`,
        codeId: 1,
        categoryId: 12,
        storeId: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Products", null, {});
  },
};
