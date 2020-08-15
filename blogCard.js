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

  return `
    <svg height="300px" width="200">


   <style>
   .header {
     font: 600 10px 'Segoe UI', Ubuntu, Sans-Serif;
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

.bold { font-weight: 700 }


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
   <foreignObject
        x="10" y="245" width="170" height="200"
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          xlink:href="#blogName" 
          class="header bold"
          style="color:#2f80ed"
        >${data.title}
        </div>
      </foreignObject>
      <text transform="translate(100,0)" xlink:href="#blogDate"  x="-90" y="240"  class="stat">
${data.author}
   </text>
   </a>
  </svg>
    `;
};

module.exports = blogCard;