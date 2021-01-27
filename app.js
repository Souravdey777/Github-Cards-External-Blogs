var express = require('express');
var app = express();
app.use(express.json());

const { getDevData, getMediumData, getHashnodeBlog, getLatestHashnodeBlog } = require('./datafetcher')
const { blogCardH, blogCardV } = require('./MediumblogCard');
const { DblogCardH, DblogCardV } = require('./DevblogCard');
const { hashnodeBlogCard, hashnodeLastestBlogCard } = require('./hashnodeBlogCard');
const { request, response } = require('express');



const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
};

app.get('/', async (request, response) => {
  response.writeHead(301, { Location: 'https://souravdey777.github.io/Github-Cards-External-Blogs/' });
  response.end();
})

app.get('/getMediumBlogs', async (request, response) => {
  try {
    if (!request.query.username) {
      response.write(JSON.stringify({ error: 'your medium username is require in the query string' }));
      response.end();
      return;
    }
    const username = request.query.username;
    let limit = 5;
    let type = 'vertical'
    if (request.query.type) {
      type = request.query.type;
    }
    if (request.query.limit) {
      limit = request.query.limit;
    }
    const resultData = (await getMediumData(username));
    let result = `<svg>`;
    if (type === 'horizontal') {
      result = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${resultData.length * 200}" version="1.2" height="310">`;
      await asyncForEach(resultData, async (blog, index) => {
        if (index >= limit) {
          return;
        }
        const blogCardObj = await blogCardH(blog);
        result += `<g transform="translate(${index * 200}, 0)">${blogCardObj}</g>`;
      });
    } else {
      result = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="400" version="1.2" height="${resultData.length * 160}">`;
      await asyncForEach(resultData, async (blog, index) => {
        if (index >= limit) {
          return;
        }
        const blogCardObj = await blogCardV(blog);
        result += `<g transform="translate(0, ${index * 160})">${blogCardObj}</g>`;
      });
    }
    result += `</svg>`;
    response.writeHead(200, { 'Content-Type': 'image/svg+xml' });
    response.write(result);
    response.end();
  } catch (error) {
    console.log(error);
    response.send('Error while fetching the data' + error);
  }
});

app.get('/getDevBlogs', async (request, response) => {
  try {
    if (!request.query.username) {
      response.write(JSON.stringify({ error: 'your medium username is require in the query string' }));
      response.end();
      return;
    }
    const username = request.query.username;
    let limit = 5;
    let type = 'vertical'
    if (request.query.type) {
      type = request.query.type;
    }
    if (request.query.limit) {
      limit = request.query.limit;
    }
    const resultData = (await getDevData(username));
    let result = `<svg>`;
    if (type === 'horizontal') {
      result = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${resultData.length * 200}" version="1.2" height="310">`;
      await asyncForEach(resultData, async (blog, index) => {
        if (index >= limit) {
          return;
        }
        const blogCardObj = await DblogCardH(blog);
        result += `<g transform="translate(${index * 200}, 0)">${blogCardObj}</g>`;
      });
    } else {
      result = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="400" version="1.2" height="${resultData.length * 160}">`;
      await asyncForEach(resultData, async (blog, index) => {
        if (index >= limit) {
          return;
        }
        const blogCardObj = await DblogCardV(blog);
        result += `<g transform="translate(0, ${index * 160})">${blogCardObj}</g>`;
      });
    }
    result += `</svg>`;
    response.writeHead(200, { 'Content-Type': 'image/svg+xml' });
    response.write(result);
    response.end();
  } catch (error) {
    console.log(error);
    response.send('Error while fetching the data' + error);
  }
});

app.get('/getMediumBlogsByID', async (request, response) => {
  try {
    if (!request.query.username) {
      response.write(JSON.stringify({ error: 'your medium username is require in the query string' }));
      response.end();
      return;
    }
    const username = request.query.username;
    let limit = 5;
    let type = 'vertical'
    if (request.query.type) {
      type = request.query.type;
    }
    if (request.query.limit) {
      limit = request.query.limit;
    }
    let data = (await getMediumData(username));
    const resultData = [];
    resultData.push(data[request.query.id])
    let result = `<svg>`;
    if (type === 'horizontal') {
      result = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${resultData.length * 200}" version="1.2" height="310">`;
      await asyncForEach(resultData, async (blog, index) => {
        if (index >= limit) {
          return;
        }
        const blogCardObj = await blogCardH(blog);
        result += `<g transform="translate(${index * 200}, 0)">${blogCardObj}</g>`;
      });
    } else {
      result = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="400" version="1.2" height="${resultData.length * 160}">`;
      await asyncForEach(resultData, async (blog, index) => {
        if (index >= limit) {
          return;
        }
        const blogCardObj = await blogCardV(blog);
        result += `<g transform="translate(0, ${index * 160})">${blogCardObj}</g>`;
      });
    }
    result += `</svg>`;
    response.writeHead(200, { 'Content-Type': 'image/svg+xml' });
    response.write(result);
    response.end();
  } catch (error) {
    console.log(error);
    response.send('Error while fetching the data' + error);
  }
});


// Hashnode Blogs
app.get('/getHashnodeBlog', async (request, response) => {
  try {
    if (!request.query.url) {
      response.write(JSON.stringify({ error: 'URL parameters are missing!' }));
      response.end();
      return;
    }
    var { hostname, pathname } = new URL(request.query.url);
    console.log(hostname, pathname)
    const slug = pathname.replace("/", "");
    const large = request.query.large === "true" ? true : false
    const resultData = (await getHashnodeBlog(slug, hostname));
    if (!resultData.data.post) {
      response.write(JSON.stringify({ error: 'Post does not exits!' }));
      response.end();
      return;
    }
    const blogCardObj = await hashnodeBlogCard(resultData.data.post, hostname, large);
    response.writeHead(200, { 'Content-Type': 'image/svg+xml' });
    response.write(blogCardObj);
    response.end();
  } catch (error) {
    console.log(error);
    response.send('Error while fetching the data' + error);
  }
});

app.get('/getLatestHashnodeBlog', async (request, response) => {
  try {
    if (!request.query.username) {
      response.write(JSON.stringify({ error: 'Query parameters are missing!' }));
      response.end();
      return;
    }
    const { username } = request.query;
    let limit = 3;
    if (request.query.limit) {
      limit = request.query.limit;
      if (limit > 6) {
        response.write(JSON.stringify({ error: 'limit parameters is more than 6!' }));
        response.end();
      }
    }
    const large = request.query.large === "true" ? true : false
    const resultData = (await getLatestHashnodeBlog(username));
    if (!resultData.data.user.publication.posts.length) {
      response.write(JSON.stringify({ error: 'Post does not exits!' }));
      response.end();
      return;
    }
    let result = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${limit * (large ? 304 : 176)}" version="1.2" height="${(large ? 530 : 310)}">`;
    await asyncForEach(resultData.data.user.publication.posts, async (blog, index) => {
      if (index >= limit) {
        return;
      }
      const blogCardObj = await hashnodeBlogCard(blog, resultData.data.user.publicationDomain, large);
      result += `<svg x="${index * (large ? 304 : 176)}" y="0">${blogCardObj}</svg>`;
    });
    result += `</svg>`;
    response.writeHead(200, { 'Content-Type': 'image/svg+xml' });
    response.write(result);
    response.end();
  } catch (error) {
    console.log(error);
    response.send('Error while fetching the data' + error);
  }
});

app.get('/getHashnodeBlogBySequence', async (request, response) => {
  try {
    if (!request.query.username || !request.query.sequence) {
      response.write(JSON.stringify({ error: 'Query parameters are missing!' }));
      response.end();
      return;
    }
    else if (request.query.sequence < 1) {
      response.write(JSON.stringify({ error: 'Please enter a valid sequence!' }));
      response.end();
      return;
    }
    const large = request.query.large === "true" ? true : false
    const { username, sequence } = request.query;
    var sequenceBy6 = sequence % 6;
    sequenceBy6 = (sequenceBy6 === 0 ? 6 : sequenceBy6)
    const page = parseInt((sequence - 1) / 6)
    const resultData = (await getLatestHashnodeBlog(username, page));
    if (!resultData.data.user.publication.posts[sequenceBy6 - 1]) {
      response.write(JSON.stringify({ error: 'Post does not exits!' }));
      response.end();
      return;
    }
    const blogCardObj = await hashnodeBlogCard(resultData.data.user.publication.posts[sequenceBy6 - 1], resultData.data.user.publicationDomain, large);
    response.writeHead(200, { 'Content-Type': 'image/svg+xml' });
    response.write(blogCardObj);
    response.end();
  } catch (error) {
    console.log(error);
    response.send('Error while fetching the data' + error);
  }
});


var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Server listening ' + port);
}); 
