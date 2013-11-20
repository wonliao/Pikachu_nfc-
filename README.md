Pikachu_nfc-
============

使用 nfc 來讀取識別id，用來摸擬刷卡遊戲

youtube 影片

[![youtube 影片](http://img.youtube.com/vi/YqvVwOB7zow/0.jpg)](http://www.youtube.com/watch?v=YqvVwOB7zow)



說明

    主要分為三個部分
    1、使用 nodejs 當 broadcast server. (請參照 https://github.com/wonliao/remote_control_box)
    2、目錄 Pikachu_android 是使用 phonegap 的 nfc plugin (請參照 https://github.com/purplecabbage/phonegap-plugins/tree/master/Android/NFC)，用來識別 nfc 標籤ID，並透 broadcast server 傳送給 ios 裝置 
    3、目錄 Pikachu_ios 單純接收 broadcast server 所傳來的資料，並播放神奇寶貝戰鬥動畫。
