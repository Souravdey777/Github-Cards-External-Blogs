const axios = require('axios');

const getBase64 = async (url) => {
  return await axios
    .get(url, {
      responseType: 'arraybuffer'
    })
    .then(response => Buffer.from(response.data, 'binary').toString('base64'))
}

const blogCard = async (data) => {
  const blogImage = await getBase64(data.thumbnail);
  const mediumLogo = await getBase64("https://raw.githubusercontent.com/harshalrj25/MasterAssetsRepo/master/mediumLong.png");
  const blogDate = new Date(data.pubDate).toLocaleString('default', { year: 'numeric', month: 'short', day: 'numeric' })
  const blogLink = data.link;
  function wrap(text, width) {
    text.each(function () {
      var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }
  return `
    <svg height="300px" width="200">


   <style>
   .header {
     font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
     fill: #2f80ed;
     animation: fadeInAnimation 0.8s ease-in-out forwards;
   }
   
.stat {
font: 600 10px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: #333;
}
.stagger {
opacity: 0;
animation: fadeInAnimation 0.3s ease-in-out forwards;
}
.rank-text {
font: 800 24px 'Segoe UI', Ubuntu, Sans-Serif; fill: #333; 
animation: scaleInAnimation 0.3s ease-in-out forwards;
}

.bold { font-weight: 700, font: 20px }
.icon {
fill: #4c71f2;
display: block;
}


}

 </style>
   <a href="${blogLink}" target="_blank">
   <rect
   data-testid="card-bg"
   x="0.5"
   y="0.5"
   rx="4.5"
   height="95%"
   stroke="#E4E2E2"
   width="95%"
   fill="#fffefe"
   stroke-opacity="1"
 />
   <text xlink:href="#blogName" transform="translate(100,0)" x="-90" y="250"  class="stat bold">
${data.title}
   </text>
   <rect
   height="200"
   stroke="#E4E2E2"
   width="85%"
   fill="#EFEFEF"  x="10" y="25" 
   stroke-opacity="1" rx="4.5"
 />
   <image xlink:href="data:image/png;base64,${blogImage}"  x="10" y="25" width="85%" height="180" />

   <text transform="translate(100,0)" xlink:href="#blogDate"  x="-90" y="15"  class="stat">
${blogDate}
   </text>
   </a>
  </svg>
    `;
};

module.exports = blogCard;