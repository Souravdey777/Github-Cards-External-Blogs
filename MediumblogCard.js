const axios = require('axios');

const getBase64 = async (url) => {
  return await axios
    .get(url, {
      responseType: 'arraybuffer'
    })
    .then(response => Buffer.from(response.data, 'binary').toString('base64'))
}

const blogCardH = async (data) => {
  const blogImage = await getBase64(data.thumbnail);
  const mediumLogo = await getBase64("https://raw.githubusercontent.com/Souravdey777/Github-Cards-External-Blogs/master/mediumlogo.png");
  const blogDate = new Date(data.pubDate).toLocaleString('default', { year: 'numeric', month: 'short', day: 'numeric' })
  const blogLink = data.link;

  return `
  <svg height="320px" width="200">
    <style>
      .title {
        font: 600 10px 'Segoe UI', Ubuntu, Sans-Serif;
        fill: #2f80ed;
        animation: fadeInAnimation 0.8s ease-in-out forwards;
      }

      .smallTitle {
        font: 600 10px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: #333;
      }

      .bold {
        font - weight: 700 
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
        fill="#EFEFEF" x="10" y="25"
        stroke-opacity="1" rx="4.5"
      />
      <image xlink:href="data:image/png;base64,${blogImage}"  x="10" y="25" width="85%" height="180" />

   <image xlink:href="data:image/png;base64,${mediumLogo}"  x="140" y="5" height="14" />

   <text transform="translate(100,0)" xlink:href="#blogDate"  x="-90" y="16"  class="smallTitle bold">
${blogDate}
   </text>
    <foreignObject
      x="10" y="245" width="170" height="200">
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        xlink:href="#blogName"
          class="title"
          style="color:#2f80ed;font-size:12px"
        >${data.title}
        </div>
      </foreignObject>
    <text transform="translate(100,0)" xlink:href="#blogDate" x="-90" y="242" class="smallTitle bold">
      ${data.author}
    </text>
   </a >
  </svg >
    `;
};




const blogCardV = async (data) => {
  const blogImage = await getBase64(data.thumbnail);
  const mediumLogo = await getBase64("https://raw.githubusercontent.com/Souravdey777/Github-Cards-External-Blogs/master/mediumlogo.png");
  const blogDate = new Date(data.pubDate).toLocaleString('default', { year: 'numeric', month: 'short', day: 'numeric' })
  const blogLink = data.link;

  return `
  <svg height="160px" width="400">
  <style>
  .title {
    font: 600 10px 'Segoe UI', Ubuntu, Sans-Serif;
    fill: #2f80ed;
    animation: fadeInAnimation 0.8s ease-in-out forwards;
  }

  .smallTitle {
    font: 600 10px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: #333;
  }

  .bold {
    font - weight: 700 
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
        height="130"
        stroke="#E4E2E2"
        width="50%"
        fill="#EFEFEF" x="10" y="10"
        stroke-opacity="1" rx="4.5"
      />
      <image 
        xlink:href="data:image/png;base64,${blogImage}"  
        x="10"
        y="10"
        width="50%"
        height="130"
      />
      <image
        xlink:href="data:image/png;base64,${mediumLogo}" 
        x="330"
        y="10"
        height="14"
      />

      <text 
        transform="translate(100,0)" 
        xlink:href="#blogDate"
        x="120"
        y="20"
        class="smallTitle bold"
      >
      ${blogDate}
      </text>
      <foreignObject
      x="220" y="60" width="150" height="120">
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        xlink:href="#blogName"
        class="title"
        style="color:#2f80ed;font-size:13px"
      >${data.title}
        </div>
      </foreignObject>
      <text transform="translate(100,0)" 
      xlink:href="#blogDate" x="120" y="45" class="smallTitle bold">
      ${data.author}
    </text>
   </a >
  </svg >
    `;
};

module.exports = { blogCardH, blogCardV };