// 检查是否在浏览器环境中
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // 浏览器环境的代码

    // 页面加载完成后获取演员帖子列表
    document.addEventListener('DOMContentLoaded', function() {
        fetchPerformerPosts();
    });

    // 获取演员帖子列表
    function fetchPerformerPosts() {
    fetch('/api/performers')
        .then(response => response.json())
        .then(performers => {
            const performerPostsContainer = document.getElementById('performerPosts');
            performerPostsContainer.innerHTML = '';
            performers.forEach(performer => {
                const performerElement = document.createElement('div');
                performerElement.innerHTML = `
                    <h3>${performer.name}</h3>
                    <p>${performer.troupe}</p>
                    <p>Works: ${performer.works}</p>
                `;
                performerPostsContainer.appendChild(performerElement);
            });
        })
        .catch(error => console.error('Error fetching performers:', error));
}

    // 创建新演员帖子
    document.getElementById('performerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const troupe = document.getElementById('troupe').value;
        const works = document.getElementById('works').value;

        fetch('/api/performers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, troupe, works }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(performer => {
            console.log('Created performer post:', performer);
            fetchPerformerPosts(); // 重新加载演员帖子列表
            document.getElementById('name').value = ''; // 清空表单
            document.getElementById('troupe').value = '';
            document.getElementById('works').value = '';
        })
        .catch(error => console.error('Error creating performer post:', error));
    });

    // 删除演员帖子
    function deletePerformerPost(id) {
        fetch(`/api/performers/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            console.log(`Performer post ${id} deleted`);
            fetchPerformerPosts(); // 重新加载演员帖子列表
        })
        .catch(error => console.error('Error deleting performer post:', error));
    }
}