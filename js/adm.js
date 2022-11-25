import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";

        // 貼り付ける場所
        import { getDatabase, ref, push, set, onChildAdded, remove, onChildRemoved } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
        // 


        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries

        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyDj_5G458KUsfIel1FzCy186NG8WchZZ2A",
            authDomain: "dev245-5dbef.firebaseapp.com",
            projectId: "dev245-5dbef",
            storageBucket: "dev245-5dbef.appspot.com",
            messagingSenderId: "599043994647",
            appId: "1:599043994647:web:6511c86ca3926df05b1852"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        // この辺りに書いていきます


        const db = getDatabase(app);
        const dbRef = ref(db, 'dev245');

        // 送信処理を記述
        $('#send').on('click', function () {

            // id="uname" の場所を取得します🤗
            const uname = $('#uname').val();
            // console.log(uname, 'データの取得の仕方で表示が異なるのをチェックしましょう🤗')

            // id="text" の場所を取得します🤗
            const text = $('#text').val();
            // console.log(text, 'データの取得の仕方で表示が異なるのをチェックしましょう🤗')

            // 取得できているか表示の確認をしましょう！
            // これ必須！ 表示の確認ができて方はalertをコメントアウトしておきましょう🤗
            // alert(uname + text);


            // データの塊を作ります🤗
            // msg という名前で塊を作ります
            // unameという鍵の名前
            // textというカギの名前
            // 作成したデータの塊をfirebaseに送信をします⇨つまりこれが保存になります🤗
            const msg = {
                uname: uname,
                text: text,
            }

            // firebaseに送る準備をしていることになります🤗
            const newPostRef = push(dbRef) //データを送信できる準備
            set(newPostRef, msg); // firebaseの登録できる場所に保存するイメージです🤗

            // 送信後に、入力欄を空にしましょう🤗
            $('#uname').val("");
            $('#text').val("");

            // これを使うとどうなるかみてみましょう🤗
            $("#uname").focus();

            // send送信イベント この下消さない
        });


        $("#text").on('keydown', function (e) {
            console.log(e, 'イベントのデータの塊')
            console.log(e.keyCode, 'イベントのデータの塊')
            // この下消さない　キーボードを押した時のクリック
        });

        // 受信処理を記述
        onChildAdded(dbRef, function (data) {
            // ここからが受信処理が始まります

            // 登録されたデータを取得します🤗
            const msg = data.val();
            console.log(msg, '取得したデータの塊')
            const key = data.key;
            console.log(key, 'データの塊にアクセス')


            // es6のテンプレートリテラル
            let h = `
                <div class="msg">
                    <p>${msg.uname}</p>
                    <p>${msg.text}</p>
                </div>    
            `;
            $("#output").append(h);
        })