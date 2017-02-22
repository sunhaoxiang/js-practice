function cssTransform(element, attr, val){
    if(!element.transform){
        element.transform = {};
    }
    if(typeof val == "undefined"){
        if(!element.transform[attr]){
            switch(attr){
                case "scale":
                case "scaleX":
                case "scaleY":
                case "scaleZ":
                    element.transform[attr] = 100;
                    break;
                default:
                    element.transform[attr] = 0;
            }
        }
        return element.transform[attr];
    } else {
        element.transform[attr] = val;
        var transformVal  = "";
        for(var s in element.transform){
            switch(s){
                case "scale":
                case "scaleX":
                case "scaleY":
                case "scaleZ":
                    transformVal += " " + s + "("+(val/100)+")";
                    break;
                case "rotate":
                case "rotateX":
                case "rotateY":
                case "rotateZ":
                case "skewX":
                case "skewY":
                    transformVal += " " + s + "("+val+"deg)";
                    break;
                default:
                    transformVal += " " + s + "("+val+"px)";
            }
        }
        console.log(transformVal);
        element.style.WebkitTransform = element.style.transform = transformVal;
    }
}
