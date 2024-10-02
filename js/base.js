let modalOverlayResult;
let closeButtonResult;
window.onload = function() {
	// 获取所有列表项
	const items = document.querySelectorAll(".item-content ul li");

	// 遍历每个列表项
	items.forEach(function (item) {
		const fold = item.querySelector(".fold");

		if (fold.style.display === "none" || getComputedStyle(fold).display === "none") {
			item.style.width = "630px";
		} else {
			item.style.width = "140px";
		}

		// 添加点击事件
		item.addEventListener("click", function () {
			item.style.width = "630px";
			item.querySelector(".unfold").style.display = "block";
			fold.style.display = "none";

			// 处理兄弟元素
			items.forEach(function (sibling) {
				if (sibling !== item) {
					sibling.style.width = "140px";
					sibling.querySelector(".unfold").style.display = "none";
					sibling.querySelector(".fold").style.display = "block";
				}
			});
		});
	});

	modalOverlayResult = document.querySelector('.modal-overlay-result');
	closeButtonResult = document.querySelector('.close-button-result');
	document.addEventListener('click', (event) => {
		if (event.target === modalOverlayResult || event.target === closeButtonResult) {
			modalOverlayResult.style.display = 'none';
		}
	});
}

function countResult(id) {
	window.location.href='./info.html'
};
