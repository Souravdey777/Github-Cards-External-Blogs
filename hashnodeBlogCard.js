const { getBase64 } = require('./getBase64');

const hashnodeBlogCard = async (data, hostname, large = false) => {
  const { title, dateAdded, brief, author, slug } = data
  const coverImage = data.coverImage !== "" ? await getBase64(data.coverImage) : "";
  const profileImage = await getBase64(author.photo);
  const blogDate = new Date(Date.parse(dateAdded)).toLocaleString('default', { year: 'numeric', month: 'short', day: 'numeric' })
  const blogLink = `https://${hostname}/${slug}`;

  return `<svg  ${large ? ` width="302" height="522"` : ` width="174" height="300" `} viewBox="0 0 302 522" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <a href="${blogLink}" target="_blank">
  <rect x="1" y="1" width="300" height="520" rx="4" fill="white" stroke="#E5E7EB" stroke-width="2"/>
  <rect id="profileImage" x="16" y="20" width="40" height="40" rx="20" />
  <clipPath id="profileImageClip">
  <use xlink:href="#profileImage"/>
  </clipPath>
  <image x="16" y="20" width="40" height="40" clip-path="url(#profileImageClip)" preserveAspectRatio="xMidYMid slice" xlink:href="data:image/png;base64,${profileImage}"/>
  <text fill="#424242"  font-family="Helvetica" font-size="14" letter-spacing="0em" x="71" y="38"><tspan font-weight="bold">${author.name}</tspan>
  <tspan fill="#424242" fill-opacity="0.75"  font-family="Helvetica" font-weight="bold" font-size="14" letter-spacing="0em">@${author.username}</tspan></text>
  <text fill="#424242" fill-opacity="0.75"  font-family="Helvetica" font-size="14" font-weight="bold" letter-spacing="0em"><tspan x="71" y="53.8636">${blogDate}</tspan></text>
  <foreignObject
        x="16" y="80" width="260" height="120">
        <p
          xmlns="http://www.w3.org/1999/xhtml"
          xlink:href="#blogName"
          style="color:#333333;font-family:Helvetica;font-size:20px;font-weight:bold;margin:0;padding:0;font-weight=bold"
          letter-spacing="0em"
          >${title}
          </p>
  </foreignObject>
  <text fill="#616161"  font-family="Helvetica" font-size="14" font-weight="bold" letter-spacing="0em"><tspan x="16" y="215">${hostname}</tspan></text>
  <foreignObject
        x="16" y=${coverImage !== "" ? `"370"` : `"225"`} width="260" height="120">
        <p
          xmlns="http://www.w3.org/1999/xhtml"
          xlink:href="#blogName"
          style="color:#333333;font-family:Helvetica;font-size:14px;margin:0;padding:0;font-weight=bold"
          letter-spacing="0em"
          >${brief}
          </p>
  </foreignObject>
  ${coverImage !== "" ? `<rect id="coverImage" x="16" y="225" width="260" height="151.2" rx="4"/>
  <clipPath id="coverImageClip">
  <use xlink:href="#coverImage"/>
  </clipPath>
  <image x="16" y="225" width="260" clip-path="url(#coverImageClip)" height="151.2" preserveAspectRatio="xMinYMin" xlink:href="data:image/png;base64,${coverImage}"/>` : null}
  </a >
  </svg > `;
};





module.exports = { hashnodeBlogCard };