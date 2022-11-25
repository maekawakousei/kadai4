import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, remove,onChildRemoved } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {};
        
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
    const db  = getDatabase(app); //RealtimeDBに接続
    const dbRef = ref(db,"chat"); //RealtimeDB内の"chat"を使う
    const storage = ref(db,"storage")
    //const tryref = ref(db,"try")
    console.log(push(dbRef))

    var bool=false
    var head = document.getElementById("head")
    //データ登録(Click)
   
    $("#send").on("click",function() {
      const msg = {
          uname: $("#uname").val(),
          text: $("#text").val()
      }
      const newPostRef = push(dbRef); //ユニークKEYを生成
      //const db1Ref =ref(db,"try/2")
      set(newPostRef, msg);           //"chat"にユニークKEYをつけてオブジェクトデータを登録
      console.log("send")

    });
    //データ登録(Enter)
    $("#text").on("keydown",function(e){
        //console.log(e);        //e変数の中身を確認！！
        if(e.keyCode == 13){   //EnterKey=13
            const msg = {
                uname: $("#uname").val(),
                text: $("#text").val()
            }

            set(newPostRef, msg);           //"chat"にユニークKEYをつけてオブジェクトデータを登録
        }
    });

//     //最初にデータ取得＆onSnapshotでリアルタイムにデータを取得
//     onChildAdded(dbRef, function(data){   
//         const msg  = data.val();    //オブジェクトデータを取得し、変数msgに代入
//         const key  = data.key;      //データのユニークキー（削除や更新に使用可能）
//         console.log(key)
//         //表示用テキスト・HTMLを作成
//         let h = '<p id = \"'+key+'\">';
//             h += msg.uname;
//             h += '<br>';
//             h += msg.text;
//             h += '</p>';
//             $("#output").append(h); //#outputの最後に追加
//         // i++
//         // console.log(i)
//         $("p").on("click",function(){
//           if(bool){
//             console.log($(this).attr("id"))
//             remove(ref(db,"try/"+$(this).attr("id")))
//           }
//         })
//     });
// $("#delete").on("click",function(){
//   if(bool){
//     bool=false
//     head.innerHTML=""
//   }else{
//     bool=true
//     head.innerHTML="削除モード"
//   }
// })
// $("p").on("click",function(){
//   if(bool){
//     console.log(5)
//   }
// })
// //　　　変数宣言
 let i;
 var count;
 var date;
 var darr=[];
 var pre;
 var abc=["A","B","C"]
 var p = 0
 var parr=[];

//　　　関数宣言

//配列の文字列化
function arr_script(arr){
  let string = "";
  for(i in arr){
    string+=arr[i]+"/"
  }
  // console.log(string)
  return string;
}
//文字列の配列化
function script_arr(script){
  let arr=[]
  arr=script.split("/")
  // for(i in arr){
  //   console.log(arr[i])
  // }
  return arr;
}
//日時比較
function dayrel(ymdhms=2,diff=1){
  let arr = script_arr(pre)
  let bool;
  if(arr[0]!=undefined){
    for(let i in darr){
      arr[i]=darr[i]-arr[i]
      if(i<ymdhms){
        if(arr[i]>0){
          bool=true;
          break;
        }
      }else if(i==ymdhms){
        if(arr[i]<diff){
          bool=false;
          break;
        }else if(arr[i]>diff){
          bool=true;
          break;
        }
      }else{
        if(arr[i]<0){
          bool=false;
          break;
        }else if(arr[i]>0){
          bool=true;
          break;
        }
      }
    }
    console.log(arr)
    return bool;
  }
  alert("dayrelerror")

}
//くじの確立の係数
function prob(){
  p=0
  let i =0
  let a;
  let sum=0;
  let lcount = abc.length
  onChildAdded(storage, function(data){
    a=Number(localStorage.getItem(abc[i]))
    p+=data.val()*a
    i++
    sum+=a;
    if(i==lcount){
      console.log(p/sum)
      p/=sum;
      p14()
      gacha()
    }
  })
}
//4種類のそれぞれの確率
function p14(){
  console.log(p)
  let sum=0;
  parr[0]=1/6+p/6
  parr[1]=1/4+p/12
  parr[2]=1/4-p/12
  parr[3]=1/3-p/6
  console.log(parr)
  // for(let i in parr){
  //   sum += parr[i]
  // }
  // console.log(sum)
}
//実際にひく
function gacha(){
  const val =Math.random()
  console.log(val)
  let border=0;
  for(let i in parr){
    border+=parr[i]
    if(border>val){
      alert(Number(i)+1+"等が当たりました")
      break
    }
  }
}


//　　　ページが開いた時の処理

//日時取得
date=new Date()    
darr[0]=date.getFullYear();
darr[1]=date.getMonth()
darr[2]=date.getDate();
darr[3]=date.getHours();
darr[4]=date.getMinutes();
darr[5]=date.getSeconds();
pre=localStorage.getItem("pre")
count=localStorage.getItem("count")
if(count==null){
  count = 2
}else if(dayrel()){
  count=2;
}
//購入履歴制作
if(localStorage.getItem("yet")!=1){
  localStorage.setItem("yet",1)
  localStorage.setItem("A",0)
  localStorage.setItem("B",0)
  localStorage.setItem("C",0)
}
// console.log(darr)
// console.log(pre);
// //count = localStorage.getItem("count")
// script_arr("1/2/3/4")
// console.log(dayrel());
// console.log(count)
//      反応
$("#try").on("click",function(){
  console.log(count)
  if(count==0){
    console.log("今日の分は使い切ったよ！")
    }else{
    if(count==2){
      localStorage.setItem("pre",arr_script(darr))
      console.log("pre_change")
    }
    //くじを回す処理
    prob()
    
  }


  //count--;
})
$("#product div").on("click",function(){
  const products = $(this).attr("id")
  console.log(products+"を買いました")
  localStorage.setItem(products,Number(localStorage.getItem(products))+1)
})
