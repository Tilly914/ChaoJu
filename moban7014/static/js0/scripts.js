// 检查是否在浏览器环境中
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // 浏览器环境的代码

    // 页面加载完成后获取帖子列表
    document.addEventListener('DOMContentLoaded', function() {
        fetchPosts();
    });

    // 获取帖子列表
    function fetchPosts() {
        fetch('/api/posts')
            .then(response => response.json())
            .then(posts => {
                const postsContainer = document.getElementById('posts');
                postsContainer.innerHTML = ''; // 清空现有帖子
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.className = 'news-block';
                    postElement.innerHTML = `
                        <h3>${post.title}</h3>
                        <p>${post.content}</p>
                        <p>演员: ${post.performer}</p>
                        <button onclick="deletePost(${post.id})">删除</button>
                    `;
                    postsContainer.appendChild(postElement);
                });
            })
            .catch(error => console.error('Error fetching posts:', error));
    }

    // 创建新帖子
    document.getElementById('postForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const performer = document.getElementById('performer').value;

        fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, performer }),
        })
        .then(response => response.json())
        .then(post => {
            console.log('Created post:', post);
            fetchPosts(); // 重新加载帖子列表
            document.getElementById('title').value = ''; // 清空表单
            document.getElementById('content').value = '';
            document.getElementById('performer').value = '';
        })
        .catch(error => console.error('Error creating post:', error));
    });

    // 删除帖子
    function deletePost(id) {
        fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            console.log(`Post ${id} deleted`);
            fetchPosts(); // 重新加载帖子列表
        })
        .catch(error => console.error('Error deleting post:', error));
    }

    // 编辑帖子
    function editPost(id) {
        fetch(`/api/posts/${id}`)
            .then(response => response.json())
            .then(post => {
                document.getElementById('title').value = post.title;
                document.getElementById('content').value = post.content;
                document.getElementById('performer').value = post.performer;
                // 显示表单供编辑
                document.getElementById('postForm').id.value = post.id; // 设置隐藏的id字段
            })
            .catch(error => console.error('Error fetching post for editing:', error));
    }

    // 更新帖子
    document.getElementById('postForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const id = document.getElementById('postForm').id.value;
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const performer = document.getElementById('performer').value;

        fetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, title, content, performer }),
        })
        .then(response => response.json())
        .then(post => {
            console.log('Updated post:', post);
            fetchPosts(); // 重新加载帖子列表
        })
        .catch(error => console.error('Error updating post:', error));
    });



}