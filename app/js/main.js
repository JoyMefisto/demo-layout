
;(function(window, document, $) {

/* light parallax */
	$(window).on('scroll', function() {
        let st = $(this).scrollTop();

        $('#some_text').css({
			'transform': 'translate(0%,' + st + '%)'
		});
        $('#section-home__img').css({
            'transform': 'translate(0%,' + st/20 + '%)'
        });
	});

/* scroll + hash */
	$("a[href^='#section-page']").on('click', e => {
		e.preventDefault();

		let hash = e.currentTarget.hash;
		let px = $(hash)[0].offsetTop;

        $('html, body').stop(true, true).animate({ scrollTop: px}, 300);
	});

/* Tabs */
	$('#tabs-list').on('click', '.tabs-list-item__link', function(e) {
	    e.preventDefault();

        let hashLink = e.currentTarget.hash.slice(1),
            $this = $(this),
            parent = $this.closest('#tabs-list'),
            widthParent = parent.width();

        let left = e.currentTarget.offsetLeft,
            width = e.currentTarget.offsetWidth,
            right = (widthParent - width) - left;

        parent.find('.tabs-list-item__link').removeClass('active');
        $this.addClass('active');

        parent.siblings('.tabs__display').css('display', 'none').siblings('#'+hashLink+'').css('display', 'block');

        parent.find('#indicator').css({
            'left': left+'px', 'right': right+'px'
        });
    });
    $('.tabs-list-item__link:first').trigger('click');

/* Notification */
	$('.notice-item').on('click', function () {
        $('.notice-list').find('.notice-item').removeClass('active');

        $(this).addClass('active');
    });

/* Fields */
	$('div.textfield-float .field').on('keyup', function() {
	    let $this = $(this);

	    ( $this.val() != '' )
            ? $this.addClass('is-not-empty')
            : $this.removeClass('is-not-empty');

    });


/* Switch */
    $('#main-switch').click(function(){
        $(this).toggleClass('is-transitioned');
    });


})(window, document, jQuery);
