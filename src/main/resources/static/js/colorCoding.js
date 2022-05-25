
function changeColor(categoryList){
      for (i of categoryList) {
        var divId = "#" + i.categoryCode;
        $(divId).css("background-color", i.categoryColor);
      }
}
