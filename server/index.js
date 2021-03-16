require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Schema = mongoose.Schema;
mongoose.connect(process.env.BAGLANTI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
///////// MONGODB ŞEMALARI - BAŞLANGI --- oncelikle mongodb icin sema olusturuyoruz
const urunSema = {
    isim: String,
    kategori: String,
    kategori_url: String,
    resimler: {
        bir: String,
        iki: String,
        uc: String,
        dort: String,
    },
    stok: {
        s: Number,
        m: Number,
        l: Number,
        xl: Number,
    },
    marka: String,
    aciklama: String,
    ind_fiyat: String,
    normal_fiyat: String,
    yildiz: {
        sayi: Number,
        puan: String,
    },
    renk: String,
    parametreler: {
        taksit: String,
        garanti: String,
        kargo: String,
    },
    satilma: Number,
    cinsiyet: String,
};
///////// MONGODB ŞEMALARI - BİTİŞ ///////


///////// MONGODB MODELLERİ - BAŞLANGIÇ
const Urun = mongoose.model("Urun", urunSema);
 //modelleri buyuk harfle olustururuz.
 //tum urun lerin modeli bu sekilde olmali diye belirtiriyoruz
///////// MONGODB MODELLERİ - BİTİŞ




app.get("/", function (req, res) {
    res.send("Başarılı..");
});
//////////////////////////                  URUN              /////////////////////////////
app.post("/api/urun/olusturma", function (req, res) {
    var urun = new Urun({
        isim: "Bu bir gömlektir",
        kategori: "Gömlek",
        kategori_url: "gomlek",
        resimler: {
            bir: "/images/items/1.jpg",
            iki: "/images/items/2.jpg",
            uc: "/images/items/3.jpg",
            dort: "/images/items/4.jpg",
        },
        stok: {
            s: 9,
            m: 9,
            l: 9,
            xl: 9,
        },
        marka: "Polo",
        aciklama:
            "Virgil Abloh's Off-White is a streetwear-inspired collection that continues to break away from the conventions of mainstream fashion. Made in Italy, these black and brown Odsy-1000 low-top sneakers.",
        ind_fiyat: "29.99",
        normal_fiyat: "39.99",
        yildiz: {
            sayi: 20,
            puan: "4.4",
        },
        renk: "Mavi",
        parametreler: {
            taksit: "12 Taksit",
            garanti: "1 Yıl",
            kargo: "Ücretsiz",
        },
        satilma: 50,
        cinsiyet: "Erkek",
    });
    urun.save(function (err) {
        if (!err) {
            res.send([
                {
                    sonuc: "başarılı",
                },
            ]);
        } else {
            res.send([
                {
                    sonuc: "hata",
                },
            ]);
        }
    });
});
app.listen(5000);