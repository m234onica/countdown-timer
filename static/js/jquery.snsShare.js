/*
 * jQuery SNS Share Plugin
 *
 * @author sj
 * @link https://github.com/samejack/SnsShare
 * @copyright Copyright 2014 SJ
 * @version 1.0.0
 * @license Apache License Version 2.0 (https://github.com/samejack/SnsShare/blob/master/LICENSE)
 */
jQuery.fn.snsShare = function (message, url) {

    var getAtagElement, makeMouseClickEvent, types;

    /**
     * Get ths a tag singleton
     * @returns {HTMLElement}
     */
    getAtagElement = function () {
        var element = document.getElementById('share-a-tag');
        if (element === null) {
            element = document.createElement('a');
            element.style = "display: none;";
            element.id = 'share-a-tag';
            element.target = "_blank";
            document.getElementsByTagName('body')[0].appendChild(element);
        }
        return element;
    };

    /**
     * Create a mouse click event
     * @returns {Event}
     */
    makeMouseClickEvent = function () {
        var clickEvent = document.createEvent('MouseEvents');
        clickEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        return clickEvent;
    };

    /**
     * Implement SNS types
     * @type {string[]}
     */
    types = ['facebook', 'line', 'twitter'];

    // fix URL
    if (typeof (url) === 'undefined') {
        url = window.location;
    }

    return this.each(function () {
        jQuery(this).click(function () {
            var element, snsType = jQuery(this).attr('data-sns'), protocol;
            if (typeof (snsType) === 'string' && jQuery.inArray(snsType, types) !== -1) {
                if (typeof (message) === 'undefined') {
                    console.log("hi");
                    message = "";
                }
                protocol = location.protocol;
                switch (snsType) {
                    case 'facebook':
                        element = getAtagElement();
                        element.href = protocol + '//www.facebook.com/sharer.php?u=' + url + '&t=' + encodeURIComponent(message);
                        element.dispatchEvent(makeMouseClickEvent());

                        gtag('event', 'Share', {
                            'event_category': 'UIEvent',
                            'event_label': 'Facebook'
                        });

                        break;

                    case 'line':
                        element = getAtagElement();
                        element.href = protocol + '//line.naver.jp/R/msg/text/?' + encodeURIComponent(message + ' ' + url);
                        element.dispatchEvent(makeMouseClickEvent());

                        gtag('event', 'Share', {
                            'event_category': 'UIEvent',
                            'event_label': 'LINE'
                        });

                        break;

                    case 'twitter':
                        element = getAtagElement();
                        element.href = protocol + '//twitter.com/share?text=' + encodeURIComponent(message) + '&url=' + url;
                        element.dispatchEvent(makeMouseClickEvent());

                        gtag('event', 'Share', {
                            'event_category': 'UIEvent',
                            'event_label': 'Twitter'
                        });

                        break;

                    default:
                        alert('SNS type not found. (' + options + ')');
                }
            } else {
                alert('data-sns attribute not set.');
            }
        });
    });
};