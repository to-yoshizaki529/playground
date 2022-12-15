const video = document.getElementById("video")
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
}).then(stream => {
    video.srcObject = stream;
    video.play()
}).catch(e => {
  console.log(e)
})

var guideChangeCount = 0;
var changePatternNum = 5;

var interval;
var intervalFlag = false;
var time_message_hidden = 6000;
var time_message_display = 5600;
var time_page_transition = 2000;    // 認証時間
var intervalTime = time_message_hidden;

var animation_interval_start;
var animation_interval;
var anime_frame_count = 0;

var auth_anime_frame_count = 0;

// 初期処理
window.onload = function()
{    
    // var psl = document.getElementById('pattern_select_list');
    // psl.insertAdjacentHTML('beforeend', '<button id="guide_change" onclick="GuideChangeClick()">-></button>');
    
    document.getElementById("image").src = outFrameSrc;

    if(patternId == "A" || patternId == "AL")
    {
        document.getElementById("message_area").style = "opacity: 1;";
        document.getElementById("message_area").style = "display: none;";
    }

    if(patternId == "AL")
    {
        document.getElementById("loading").style = "display: none;";
    }

    // if(typeof anime_pattern !== 'undefined')
    // {
    //     if(anime_pattern == "blink_late")
    //     {
    //         time_message_display = 3200;

    //     }else if(anime_pattern == "blink_front")
    //     {
    //         time_message_display = 3800;

    //     }
    // }

    GuideChangeClick();
}


function GuideChangeClick() {
    var frame_elem = document.getElementById("frame");
    var auth_elem = document.getElementById("frame");

    // A案 メッセージ表示処理
    if(patternId == "A" || patternId == "AL")
    {

        // 認証前 初期状態
        if(guideChangeCount == 0)
        {
            interval = setTimeout(
                function intervalFunc()
                {
                    var message_area = document.getElementById("message_area");
                    if(!intervalFlag){  // メッセージ表示処理
                        
                        if(typeof anime_pattern !== 'undefined')
                        {
                            if(anime_pattern == "blink_late"){  // 後にブリンクパターン  *********************************************************************************
                                
                                if(typeof noMessage !== 'undefined' && !noMessage){
                                    // classを取り除く
                                    message_area.style = "opacity: 0;"; // 非表示
                                    message_area.classList.remove("frame_fadeout");

                                    // メッセージ表示
                                    message_area.style = "display: inline-grid;";
                                    message_area.classList.add("frame_fadein");
                                }
                                intervalFlag = true;
                                intervalTime = time_message_display;

                                //
                                //
                                //
                                // フレーム アニメーション処理
                                if(typeof anime_file_path !== 'undefined')
                                {
                                    animation_interval_start = setTimeout(
                                        function() {
                                            animation_interval = setInterval(
                                                function() {
                                                    // アニメーションを繰り返し表示
                                                    frame_elem.src = anime_file_path + ( '00000' + anime_frame_count ).slice( -5 ) + ".png";
            
                                                    anime_frame_count++;    // カウントアップ
            
                                                    if(anime_frame_count >= anime_frame_max_num)
                                                    {
                                                        anime_frame_count = 0;
                                                        frame_elem.src = frameStandbySrc;
                                                        clearInterval(animation_interval);
                                                    }
                                                },
                                                66.66    // パラパラのコマ 15fps 1000ms 
                                            );
                                        },
                                        0    // 設定秒後に作動
                                    );
                                }
                                //
                                //
                                //
                                //

                            }
                            else if(anime_pattern == "blink_front")    // 先にブリンクパターン  *********************************************************************************
                            {
                                if(typeof noMessage !== 'undefined' && !noMessage){
                                    // classを取り除く
                                    message_area.style = "opacity: 0;"; // 非表示
                                    message_area.classList.remove("frame_fadeout");
                                }

                                intervalFlag = true;
                                intervalTime = time_message_display;

                                //
                                //
                                //
                                // フレーム アニメーション処理
                                animation_interval = setInterval(
                                    function()
                                    {
                                        // アニメーションを繰り返し表示
                                        frame_elem.src = anime_file_path + ( '00000' + anime_frame_count ).slice( -5 ) + ".png";

                                        anime_frame_count++;    // カウントアップ

                                        if(anime_frame_count >= anime_frame_max_num)
                                        {
                                            anime_frame_count = 0;
                                            frame_elem.src = frameStandbySrc;
                                            clearInterval(animation_interval);
                                        }
                                    },
                                    66.66    // パラパラのコマ 15fps 1000ms 
                                );
                                //
                                //
                                //
                                //

                                // メッセージ表示
                                if(typeof anime_file_path !== 'undefined')
                                {
                                    if(typeof noMessage !== 'undefined' && !noMessage){
                                        animation_interval_start = setTimeout(
                                            function() {
                                                message_area.style = "display: inline-grid;";
                                                message_area.classList.add("frame_fadein");
                                            },
                                            1000    // 設定秒後に作動
                                        );
                                    }
                                }
                            }

                        }
                    }
                    else if(intervalFlag){  // メッセージ非表示処理
                        if(typeof noMessage !== 'undefined' && !noMessage)
                        {
                            message_area.classList.remove("frame_fadein");
                            message_area.classList.add("frame_fadeout");
                        }
                        intervalFlag = false;
                        intervalTime = time_message_hidden;
                    }
                    interval = setTimeout(intervalFunc, intervalTime);
                },
                intervalTime
            );
        }
        // 認証中
        else if(guideChangeCount == 1)
        {
            clearTimeout(interval); 
            clearTimeout(animation_interval); 
            document.getElementById("message_area").style = "display: none;";
            document.getElementById("message_area").classList.remove("frame_fadein");
            document.getElementById("message_area").classList.remove("frame_fadeout");

            // 認証中アニメーション
            if(typeof auth_anime_file_path !== 'undefined')
            {
                auth_animation_interval = setInterval(
                    function() {
                        // アニメーションを繰り返し表示
                        frame_elem.src = auth_anime_file_path + ( '00000' + auth_anime_frame_count ).slice( -5 ) + ".png";
    
                        auth_anime_frame_count++;    // カウントアップ
    
                        if(auth_anime_frame_count >= auth_anime_frame_max_num)
                        {
                            auth_anime_frame_count = 0;
                            if(document.getElementById("loading") != null) {
                                document.getElementById("loading").style = "display: inline-grid;";
                            }
                            // frame_elem.src = frameStandbySrc;
                            clearInterval(auth_animation_interval);
                        }

                    },
                    66.66    // パラパラのコマ 15fps 1000ms 
                );
            }

        }
    }


    if(guideChangeCount == 0)
    {
        var wrapper_elm = document.getElementById("wrapper");
        var key_select_wrapper_elm = document.getElementById("key_select_wrapper");

        wrapper_elm.classList.remove("window_fadeout");
        key_select_wrapper_elm.classList.remove("window_fadein");

        document.getElementById("key_select_wrapper").style = "display: none;";
        document.getElementById("wrapper").style = "display: block;";

        if(patternId == "AL")
        {
            document.getElementById("loading").style = "display: none;";
        }
    
        frame_elem.src = frameStandbySrc;

        guideChangeCount = 1;

    }
    else if(guideChangeCount == 1)
    {
        frame_elem.src = frameAuthSrc;

        if(patternId == "AL")
        {
            document.getElementById("loading").style = "display: block;";
        }
    
        setTimeout(
            function(){
                guideChangeCount = 2;
                GuideChangeClick();
            },
            time_page_transition
        );
    }
    // 施解錠選択画面
    else if(guideChangeCount == 2)
    {
        var wrapper_elm = document.getElementById("wrapper");
        var key_select_wrapper_elm = document.getElementById("key_select_wrapper");

        guideChangeCount = 0;

        wrapper_elm.classList.add("window_fadeout");
        setTimeout(
            function(){
                if(document.getElementById("loading") != null)
                {
                    document.getElementById("loading").style = "display: none;";
                }
                wrapper_elm.style = "display: none;";
                key_select_wrapper_elm.classList.add("window_fadein");
                key_select_wrapper_elm.style = "display: block;";
            },
            400
        );
        
    }


}
