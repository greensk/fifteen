$(function() {
	var mapWidth = 4, mapHeight = 4, fieldWidth = 40, fieldHeight = 40;
	var limit = (mapWidth * mapHeight) - 1;
	var order = [];
	for (var i = 1 ; i <= limit; i++) {
		order.push(i);
	}
	var disorder = _.shuffle(order);
	for (var i = 1; i <= mapWidth; i++) {
		for (var j = 1; j <= mapHeight; j++) {
			$('<div></div>').
					addClass('field').
					attr('id', 'field-' + i.toString() + '-' + j.toString()).
					data({x: i, y: j}).
					css({
						width: fieldWidth, 
						height: fieldHeight, 
						left: (i-1) * fieldWidth, 
						top: (j-1) * fieldHeight
					}).
					text(disorder.pop()).appendTo('#map');
					
		}
	}
	$('.field').on('click', function() {
		$this = $(this);
		var x = $this.data('x'), y = $this.data('y');
		// поиск соседней пустой клетки
		_.each([[0, 1], [0, -1], [1, 0], [-1, 0]], function (item) {
			$dest = $('#field-' + (x + item[0]).toString() + '-' + (y + item[1]).toString());
			if ($dest.length && $dest.text() == '') {
				// перемещение
				$dest.text($this.text());
				$this.text('');
				// проверка на победу
				if (_.every($('.field'), function(element) {
					$element = $(element);
					var num = ($element.data('y') - 1) * mapWidth + ($element.data('x'))
					return num > limit || $element.text() == num;
				})) {
					alert('Вы победили!');
					$('.field').off('click');
				}
			}
		});
	});
});
