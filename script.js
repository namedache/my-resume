// 页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const header = document.querySelector('.header');

    // 先设置初始状态
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    // 渐入动画
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // 技能项交互效果
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            item.style.transform = 'scale(0.95)';
            item.style.boxShadow = '0 0 30px rgba(99, 102, 241, 0.5)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
                item.style.boxShadow = '';
            }, 200);
        });

        // 鼠标移入时的发光效果
        item.addEventListener('mouseenter', () => {
            item.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.3)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.boxShadow = '';
        });
    });

    // 鼠标移动视差效果
    const container = document.querySelector('.container');
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        container.style.transform = `perspective(1000px) rotateY(${x * 2}deg) rotateX(${-y * 2}deg)`;
    });

    container.addEventListener('mouseleave', () => {
        container.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        container.style.transition = 'transform 0.5s ease';
    });

    container.addEventListener('mouseenter', () => {
        container.style.transition = 'none';
    });

    // 联系方式复制功能
    const contactValues = document.querySelectorAll('.contact-value');
    contactValues.forEach(value => {
        value.style.cursor = 'pointer';
        value.addEventListener('click', () => {
            const text = value.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const originalColor = value.style.color;
                value.style.color = '#10b981';
                value.textContent = '已复制!';
                setTimeout(() => {
                    value.textContent = text;
                    value.style.color = originalColor;
                }, 1000);
            });
        });
    });
});
