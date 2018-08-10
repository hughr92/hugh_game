
$( document ).ready(function() {
    console.log( "ready!" );


        //adjust the volume of the background track
        document.getElementById("myAudio").volume = 0.2;

        //saving dom objects to variables
        const container = $('#container');

        //player pieces
        const ship = $('#ship');
        const pole = $('.pole');
        const pole_1 = $('#pole_1');
        const pole_2 = $('#pole_2');

        //score - speed - win/loss buttons
        const score = $('#score');
        let final_score = $('.total-score');
        const speed_span = $('.speed');
        const restart_screen = $('#restart-container');
        const restart_btn = $('#restart_btn');
        const win_btn = $('#win_btn');

        //win condition
        win_screen = $('#win-container');

        //for muted games - not fully developed yet
        const head_talk = $('#head-talk');
        const rick_talk = $('#rick-talk');
        const morty_talk = $('#morty-talk');

        // coins - positive points
        const coin = $('#coin');
        const coin_initial_position = parseInt(coin.css('right'));

        // dmg - negative points
        const dmg = $('#dmg');
        const dmg_initial_position = parseInt(coin.css('right'));

        //saving some initial setup
        const container_width = parseInt(container.width());
        const container_height = parseInt(container.height());

        const pole_initial_position = parseInt(pole.css('right'));
        const pole_initial_height = parseInt(pole.css('height'));

        const ship_left = parseInt(ship.css('left'));
        const ship_height = parseInt(ship.height());
       
        let speed = 10;
        //number ^ equals the rate of px poles move per function - 30ms in this case

        //some other declarations
        let go_up = false;
        let score_updated = false;
        let game_over = false;


        let lives = 3;









        const the_game = setInterval(function () {

            //if the player doesn't win
            restart_screen.hide();
            //if the player wins
            win_screen.hide();

            // update speed html
            speed_span.text(speed - 10);



            //characters talking - may get rid of this.
            //rick
            if (speed > 0) {
                $('#rick-talk').hide();
            }

            if (speed % 6 === 0 && speed % 13 === 0){
                $('#rick-talk').html('he wants to see what we got');
                $('#rick-talk').show();
            } else if (speed % 6 == 0) {
                $('#rick-talk').html('come on morty');
                $('#rick-talk').show();
            } else if (speed % 13 == 0) {
                $('#rick-talk').html('really morty');
                $('#rick-talk').show();
            }

            //morty
            if (speed > 0) {
                $('#morty-talk').hide();
            }

            if (speed % 6 === 1 && speed % 13 === 1){
                $('#morty-talk').html('this is all I got');
                $('#morty-talk').show();
            } else if (speed % 6 == 1) {
                $('#morty-talk').html('im trying');
                $('#morty-talk').show();
            } else if (speed % 13 == 1) {
                $('#morty-talk').html('oh jeeze rick');
                $('#morty-talk').show();
            }

            //end characters talking

            //head talking
            $('#head-talk').html('show me what you got');


            if (speed > 10) {
                $('#head-talk').hide();
            }

            if (speed == 12) {
                $('#head-talk').html('I want to see what you got');
                $('#head-talk').show();

                // AUDIO - not working
                // let alreadyExecuted = false;
                // if (alreadyExecuted === false) {
                //     head_audio.play();
                //     alreadyExecuted = true;
                // };

            }

            //end head talking

            //speed gage - link to levels later
            if (speed === 10) {
                $('.gage img').attr('src', "images/speed/speed-v2/speed-1.png")
            } else if (speed === 13) {
                $('.gage img').attr('src', "images/speed/speed-v2/speed-2.png")
            } else if (speed === 16) {
                $('.gage img').attr('src', "images/speed/speed-v2/speed-3.png")
            } else if (speed === 19) {
                $('.gage img').attr('src', "images/speed/speed-v2/speed-4.png")
            } else if (speed === 22) {
                $('.gage img').attr('src', "images/speed/speed-v2/speed-5.png")
            } else if (speed === 25) {
                $('.gage img').attr('src', "images/speed/speed-v2/speed-6.png")
            } else if (speed === 28) {
                $('.gage img').attr('src', "images/speed/speed-v2/speed-7.png")
            } else if (speed === 31) {
                $('.gage img').attr('src', "images/speed/speed-v2/speed-8.png")
            } else if (speed === 34) {
                $('.gage img').attr('src', "images/speed/speed-v2/speed-9.png")
            } else if (speed === 37) {
                $('.gage img').attr('src', "images/speed/speed-v2/speed-10.png")
            }


            // audio array container variables

            let game_over_audio = document.createElement('audio');

            let coin_audio = document.createElement('audio');

            let hit_audio = document.createElement('audio');






            // COLLISION WITH POLE OR TOP OR BOT
            if ((collision(ship, pole_1) || collision(ship, pole_2) || parseInt(ship.css('top')) <= 0 || parseInt(ship.css('top')) > container_height - ship_height)&&lives === 0) {
                
                //If collisions and with no lives - this happens

                if (speed == 50) {
                    game_over_audio.setAttribute('src', 'audio/go-good-1.wav');
                } else {
                    game_over_audio.setAttribute('src', 'audio/go-1.wav');
                }

                game_over_audio.play();

                stop_the_game();
            

            } else if ((collision(ship, pole_1) || collision(ship, pole_2) || parseInt(ship.css('top')) <= 0 || parseInt(ship.css('top')) > container_height - ship_height)&& lives > 0) {
                
                //If Collision and still have + lives - shields, run this

                lives = lives - 1;

                // other
                let pole_current_position = parseInt(pole.css('right'));


                //check whether the poles went out of the container
                // randomize the pole height - * RANGE of pxs
                let new_height = parseInt(Math.random() * 100);

                //change the pole's height
                pole_1.css('height', pole_initial_height + new_height);
                pole_2.css('height', pole_initial_height - new_height);

                // reset the pole position so collision doesn't trigger again instantly
                pole_current_position = pole_initial_position;

                // reset the ships position so collision doesn't trigger again instantly
                $('#ship').css('top', '40%');
                
                //move the poles
                pole.css('right', pole_current_position + speed);  

                if (go_up === false) {
                    go_down();
                }

                return lives;

            } else { 



                let pole_current_position = parseInt(pole.css('right'));

                //update the score when the poles have passed the bird successfully
                if (pole_current_position > container_width - ship_left) {
                    if (score_updated === false) {
                        score.text(parseInt(score.text()) + 1 * (speed - 9));
                        final_score.text(parseInt(score.text()));
                        score_updated = true;
                    }
                }

                //check whether the poles went out of the container
                if (pole_current_position > container_width) {
                    let new_height = parseInt(Math.random() * 100);

                    //change the pole's height
                    pole_1.css('height', pole_initial_height + new_height);
                    pole_2.css('height', pole_initial_height - new_height);

                    //increase speed
                    if (speed < 50) {
                        speed = speed + 1;
                        speed_span.text(speed - 10);
                    }

                    score_updated = false;

                    pole_current_position = pole_initial_position;
                }

                //move the poles
                pole.css('right', pole_current_position + speed);  

                if (go_up === false) {
                    go_down();
                }

            }

            //shield skins
            if (lives == 2) {
                $('#shield').css('background-image', 'url(images/force-field-yellow.png)');
                $('div #shield').css('animation', 'final 3s normal linear');
                $('#lives').css('background-color', 'rgba(255,159,0,0.7)');
                $('#lives').css('border', '4px solid orange');
                $('#lives h2').text('2');
            }

            if (lives == 1) {
                $('#shield').css('background-image', 'url(images/force-field-red.png)');
                $('div #shield').css('animation', 'final 3s infinite linear');
                $('#lives').css('background-color', 'rgba(255,0,0,0.7)');
                $('#lives').css('border', '4px solid red');
                $('#lives h2').text('1');
            }

            if (lives == 0) {
                $('div #shield').css('background-image', 'none');
                $('#lives').css('background-color', 'darkgrey');
                $('#lives').css('border', '4px solid grey');
                $('#lives h2').text('0');
            }


            //COINS - have to update collision function

            let coin_current_position = parseInt(coin.css('right')); 
            // coin.css('top', coin_initial_height + new_height);



            if (collision(ship, coin)) {
                score.text(parseInt(score.text()) + 1);
                final_score.text(parseInt(score.text()) + 5);
                score_updated = true;

                coin_current_position = coin_initial_position;
                //change the coins's top
                let new_top = parseInt(Math.random() * 500);

                coin.css('top', new_top);

                const coin_audio_array = [
                    'audio/coin-1.wav',
                    'audio/coin-2.wav',
                    'audio/coin-3.wav',
                    'audio/coin-4.wav',
                    'audio/coin-5.wav'
                ];


                const random_coin = coin_audio_array[Math.floor(Math.random()*coin_audio_array.length)];

                coin_audio.setAttribute('src', `${random_coin}`);

                coin_audio.play();

            } 

            //check whether the coins went out of the container
            if (coin_current_position > container_width) {
                let new_top = parseInt(Math.random() * 500);
                coin_current_position = coin_initial_position;

                //change the coins's top
                coin.css('top', new_top)
            }


            //move the coins
            coin.css('right', coin_current_position + speed - 7); 


            //DMG

            let dmg_current_position = parseInt(dmg.css('right'));

            if (collision(ship, dmg)) {
                score.text(parseInt(score.text()) - 1);
                final_score.text(parseInt(score.text()) - 5);
                score_updated = true;

                dmg_current_position = dmg_initial_position;

                let new_top=parseInt(Math.random() * 500);

                dmg.css('top', new_top);

                const hit_audio_array = [
                    'audio/hit-1.wav',
                    'audio/hit-2.wav',
                    'audio/hit-3.mp3',
                    'audio/hit-4.wav',
                    'audio/hit-5.wav'
                ];

                // select random audio from array
                const random_hit = hit_audio_array[Math.floor(Math.random()*hit_audio_array.length)];

                hit_audio.setAttribute('src', `${random_hit}`);

                hit_audio.play();
            }

            if (dmg_current_position > container_width) {

                let new_top = parseInt(Math.random()*500);
                dmg_current_position = dmg_initial_position;

                dmg.css('top', new_top);

            }

            //move the dmg
            dmg.css('right', dmg_current_position + speed - 6);


            // FLAME ANIMATION
            $('.flame').fadeOut(250, function(){
                $(this).fadeIn(250);
            });


            let level_2 = 14;
            let level_3 = 20;
            let level_4 = 28;
            let level_5 = 38;



            // POINTS - LEVELS
            //level 1 - rules  - not needed
            //level 2
            if (speed >= level_2) {
                // rules - dissapear
                $('.rule').fadeOut(1000);
                $('#level h2').text('');
                $('#level-flash h2').text('Level 2');
                //possible changes for later
                // $('#container').css('background-image', 'url(images/background-1.png)');
                // $('.pole').css('background-image', 'url(images/debris-l2.png)');
            };
            if (speed >= (level_2 + 2)) {
                $('#level h2').text('Level 2');
                $('#level-flash h2').text('');
            };
            //level 3
            if (speed >= level_3) {
                $('#level h2').text('');
                $('#level-flash h2').text('Level 3');
            };
            if (speed >= (level_3 + 3)) {
                $('#level h2').text('Level 3');
                $('#level-flash h2').text('');
            };
            //level 4
            if (speed >= level_4) {
                $('#level h2').text('');
                $('#level-flash h2').text('Level 4');
            };
            if (speed >= (level_4 + 4)) {
                $('#level h2').text('Level 4');
                $('#level-flash h2').text('');
            };
            //level 5
            if (speed >= level_5) {
                $('#level h2').text('');
                $('#level-flash h2').text('Level 5');
                $('#max-level-flash h3').text('Final level');
            };
            if (speed >= (level_5 + 5)) {
                $('#level h2').text('Level 5');
                $('#max-level-flash h3').text('');
                $('#max-level h3').text('Final level');
            };
            //win condition
            if (speed == 50) {
                win_the_game();
            };


            // this number controls the speed of the game - lower = faster
            // basically  acts like a frame rate

        }, 30);

        let ship_audio = document.createElement('audio');

        $(document).on('keydown', function (e) {
            const key = e.keyCode;
            if (key === 32 && go_up === false && game_over === false) {
                go_up = setInterval(up, 50);
                $('.slip-stream').css('opacity', '1').fadeIn(500);
                // INSERT AUDIO HERE
                ship_audio.setAttribute('src', 'audio/rocket-sfx-3.wav');
                ship_audio.play();
            }
        });

        $(document).on('keyup', function (e) {
            const key = e.keyCode;
            if (key === 32) {
                clearInterval(go_up);
                go_up = false;
                $('.slip-stream').css('opacity', '0.5');
                ship_audio.pause();
            }
        });


        function go_down() {
            ship.css('top', parseInt(ship.css('top')) + 5);
        }

        function up() {
            ship.css('top', parseInt(ship.css('top')) - 10);
        }

        function stop_the_game() {
            if (speed > 20){
                $("#end-image").attr("src","images/end-screen-3.png");
                $('#head-talk').html('good enough');
                $('#head-talk').show();
            } else if (speed > 15) {
                $("#end-image").attr("src","images/end-screen-2.png");
                $('#head-talk').html('good enough');
                $('#head-talk').show();
            } else {
                $('#head-talk').html('not good enough');
                $('#head-talk').show();
            }


            clearInterval(the_game);
            game_over = true;
            restart_screen.show();
            restart_btn.show();
            //Add other events here
            $('#ship').css('animation', 'crash 2s normal ease-out');
            $('#ship').css('animation-fill-mode', 'forwards');
            $('#ship').css('animation-iteration-count', '1');
            $('.slip-stream').css('opacity', '0');
        }

        function win_the_game() {

            clearInterval(the_game);
            game_over = true;
            win_screen.show();
            win_btn.show();
            //Add other events here
            $('#portal').css('opacity', '1');
            $('.pole').css('opacity', '0');
            $('#ship').css('animation', 'ship 3s normal linear');
            $('#ship').css('animation-fill-mode', 'forwards');
            $('#ship').css('animation-iteration-count', '1');
            //add voice line here
        };


        win_btn.click(function () {
            location.reload();
        });

        restart_btn.click(function () {
            location.reload();
        });

        function collision($div1, $div2) {
            // parameter 1 offset from left
            let x1 = $div1.offset().left;
            // parameter 1 offset from top
            let y1 = $div1.offset().top;
            // parameter 1 height (includes border/padding etc)
            let h1 = $div1.outerHeight(true);
            // parameter 1 width (includes border/padding etc)
            let w1 = $div1.outerWidth(true);
            // condition b1 is the offset of top + the height of the div
            let b1 = y1 + h1;
            // condition b1 is the offset of left + the width of the div
            let r1 = x1 + w1;
            //repeat above steps for div 2 - other paramter
            let x2 = $div2.offset().left;
            let y2 = $div2.offset().top;
            let h2 = $div2.outerHeight(true);
            let w2 = $div2.outerWidth(true);
            let b2 = y2 + h2;
            let r2 = x2 + w2;

            // b1 < y2 = if the value of b1 is less than y2, they have not hit
            // etc
            // if any of these conditions are met, return false
            // if any are not met, return true - collision
            if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
            return true;
        }


});



