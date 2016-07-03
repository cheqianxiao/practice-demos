window.onload = function(cls) {
  if (!document.getElementsByClassName) {
    document.getElementsByClassName = function() {
      var ret = [];
      var els = document.getElementsByTagName("*");
      for (var i = 0, len = els.length; i < len; i++) {
        var childNames = els[i].className.split(" ");
        for (var j = 0; j < childNames.length; j++) {
          if (childNames[j] === cls) {
            ret.push(els[i]);
            break;
          }
        }
      }
      return ret;
    }
  }
  var quantity_select = document.getElementsByClassName("quantity_select");
  var remove = document.getElementsByClassName("remove");
  var shopping_bag_items = document.getElementsByClassName("shopping-bag-items")[0];
  var product_total = document.getElementById("product_total");
  var pay_total = document.getElementById("pay_total");

  //删除某件商品
  for (var i = 0; i < remove.length; i++) {
    remove[i].onclick = function() {
      var li = this.parentNode.parentNode.parentNode.parentNode;
      shopping_bag_items.removeChild(li);
      getTotal();


    }
  }
  //更改数量
  for (var j = 0; j < quantity_select.length; j++) {
    quantity_select[j].onchange = (
      function(j) {
        return function() {
          var quantity = this.value;
          var price = prev(this.parentNode.parentNode).children[1].innerHTML.substr(1);
          getSubTotal(quantity, parseFloat(price), j);
          getTotal();
        }
      }
    )(j);
  }
  //获得小计
  function getSubTotal(quantity, price, n) {
    var itemTotalPrice = document.getElementsByClassName("itemTotalPrice");
    itemTotalPrice[n].children[0].innerHTML = "¥" + (quantity * price).toFixed(2);

  }
  //获得总计
  function getTotal() {
    var itemTotalPrice = document.getElementsByClassName("itemTotalPrice");
    var productTotal = 0;
    for (var i = 0; i < itemTotalPrice.length; i++) {
      productTotal += parseFloat(itemTotalPrice[i].children[0].innerHTML.substr(1));
    }
    product_total.innerHTML = "¥" + productTotal.toFixed(2);
    pay_total.innerHTML = "¥" + (productTotal + 10).toFixed(2);
  }

  //获取元素的上一节点
  function prev(el) {
    var prevNode = el.previousSibling;
    return prevNode.nodeType == 3 ? prev(prevNode) : prevNode;
  }

}
