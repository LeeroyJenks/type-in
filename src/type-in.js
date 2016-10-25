(function($) {
	$.fn.typeIn = function(options) {

		if (this.length === 0) {
			console.log('nothing here!');
			return this;
		}
		var settings = $.extend({
			textClass: null,
			frames: 0,
			startTime: 5000,
			interval: 5000,
			revealAnimation: 'appear'
		}, options);

		if (settings.textClass === null) {
			console.log('pick a textClass for location of texts!');
			return this;
		}
		var numberOfEl = this.length;

		return this.each(function(index) {
			var sEl = $(this);
			var $firstString = $(settings.textClass).first();
			var $nextString = $firstString.next();
			var $lastString = $(settings.textClass).last();

			var setupType = function() {
				var $el = $(sEl);
				var tO;
				var oldI = [];
				var newI = [];
				$(settings.textClass).hide();
				if ($firstString.children().length > 0) {
					$(sEl).html($firstString.html());
				} else {
					$(sEl).html($firstString.text());
				}

				tO = setTimeout(sStart, settings.startTime);

				function sStart() {
					clearTimeout(tO);
					newI = [];
					var $childElements = $(sEl).children();
					var $firstOld = $childElements.first();
					$el.empty();

					$nextString.children().each(function(index) {
						var $thisEl = $(this);
						var $thisClone = $thisEl.clone();
						var cloneText = $thisClone.attr('data-string', $thisEl.text()).text().split("");
						//console.log(cloneText);
						$el.append($thisClone.empty());
						$.each(cloneText, function(i, el) {
							$thisClone.append('<span class="type-hidden" style="opacity: 0;">' + el + "</span>");
						});
						if (index == ($nextString.children().length - 1)) {
							if (settings.revealAnimation == 'appear') {
								revealWord($el.children().first().get(0), 0, 0);
							} else if (settings.revealAnimation == 'type') {
								typeWord($el.children().first().get(0), 0, 0);
							}

						}
					});
				}

				function revealWord(childEl, n, frame) {
					var $thisChild = $(childEl);
					var thisFrame = frame || 0;
					var thisString = $thisChild.data('string');
					var thisText = $thisChild.text();
					if (thisFrame < settings.frames) {
						thisFrame++;
						newI[n] = requestAnimationFrame(function() {
							revealWord($thisChild.get(0), n, thisFrame);
						});
						return;
					} else {
						if (!$thisChild.children().length) {
							cancelAnimationFrame(newI[n]);
							if ($thisChild.next().length) {
								newI[n + 1] = requestAnimationFrame(function() {
									revealWord($thisChild.next().get(0), n + 1, 0);
								});
							} else {
								//if ($thisChild.parent().text().trim() == $nextString.text().trim()) {
								$nextString = ($nextString.next().length > 0 ? $nextString.next() : $firstString);
								tO = setTimeout(sStart, settings.interval);
								//}
							}
						} else {
							$thisChild.children().first().contents().unwrap();
							newI[n] = requestAnimationFrame(function() {
								revealWord($thisChild.get(0), n, 0);
							});
						}
					}
				}

				function typeWord(childEl, n, frame) {
					var $thisChild = $(childEl);
					var thisFrame = frame || 0;
					var thisString = $thisChild.data('string');
					var thisText = $thisChild.text();
					if (thisFrame < settings.frames) {
						thisFrame++;
						newI[n] = requestAnimationFrame(function() {
							typeWord($thisChild.get(0), n, thisFrame);
						});
						return;
					} else {
						if ($thisChild.text() == thisString) {
							cancelAnimationFrame(newI[n]);
							if ($thisChild.next().length > 0) {
								newI[n + 1] = requestAnimationFrame(function() {
									typeWord($thisChild.next().get(0), n + 1, 0);
								});
							} else {
								console.log($thisChild.parent().text().trim());
								console.log($nextString.text().trim());
								if ($thisChild.parent().text().trim() == $nextString.text().trim()) {
									$nextString = ($nextString.next().length > 0 ? $nextString.next() : $firstString);
									tO = setTimeout(sStart, settings.interval);
								}
							}
						} else {
							$thisChild.text(thisString.substring(0, (thisText.length + 1)));
							if ($thisChild.parent().text().trim() == $nextString.text().trim()) {
								$nextString = ($nextString.next().length > 0 ? $nextString.next() : $firstString);
								tO = setTimeout(sStart, settings.interval);
							} else {
								newI[n] = requestAnimationFrame(function() {
									typeWord($thisChild.get(0), n, 0);
								});
							}
						}
					}
				}
			};

			setupType();

		});
	};

}(jQuery));