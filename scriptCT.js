// 定义API key（实际使用时应从环境变量或其他安全方式获取）
const API_KEY = "your-api-key-here";

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// 汉堡菜单展开/收起逻辑
function setupHamburgerMenu() {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
    });
}

// 表单提交功能
function submitForm() {
    // 获取表单数据
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const residentType = document.querySelector('input[name="resident"]:checked')?.value;
    const message = document.getElementById('message').value; // 新增 Message 字段

    // 验证必填字段
    if (!name || !age || !email || !phone) {
        alert('Please fill in all required fields!');
        return;
    }

    // 构造要发送的数据
    const formData = {
        name: name,
        age: age,
        email: email,
        phone: phone,
        residentType: residentType || 'Not selected',
        message: message || 'No message provided' // 新增 Message 字段
    };

    // 使用fetch发送数据到后端
    fetch('https://your-backend-api-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}` // 使用API key进行认证
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response failed');
        }
        return response.json();
    })
    .then(data => {
        console.log('Backend response：', data);
        alert('Submission successful! We will contact you within 30 minutes.');

        // 清空表单
        document.getElementById('name').value = '';
        document.getElementById('age').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('message').value = ''; // 清空 Message 字段
        document.querySelectorAll('input[name="resident"]').forEach(radio => radio.checked = false);
    })
    .catch(error => {
        console.error('Submission failed：', error);
        alert('Submission failed. Please try again later!');
    });
}

// 初始化汉堡菜单
setupHamburgerMenu();