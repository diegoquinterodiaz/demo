/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function(){
    $('.button').click(function(e) {
        $('.all').quicksand( $('.warm li'), {
            duration: 3000,
            attribute: 'id',
            easing: 'easeInOutQuad'
        });
        //e.preventDefault();
    }); 
});

