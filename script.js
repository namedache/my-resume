// 页面初始化
document.addEventListener('DOMContentLoaded', () => {
    // 渐入动画
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('.section, .experience-item, .project-item, .education-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(section);
        });
    };

    animateOnScroll();

    // 技能标签交互
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.style.transform = 'scale(0.95)';
            setTimeout(() => {
                tag.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // 项目卡片悬停效果增强
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.borderColor = 'var(--primary-light)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.borderColor = '';
        });
    });

    // 联系卡片点击复制
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const value = card.querySelector('.contact-value');
            const text = value.textContent;

            // 处理邮箱
            if (card.href && card.href.startsWith('mailto:')) {
                window.location.href = card.href;
                return;
            }

            // 处理电话
            if (card.href && card.href.startsWith('tel:')) {
                window.location.href = card.href;
                return;
            }

            // 处理GitHub链接
            if (card.href && card.href.includes('github')) {
                window.open(card.href, '_blank');
                return;
            }

            // 复制其他内容
            navigator.clipboard.writeText(text).then(() => {
                const originalText = value.textContent;
                const originalColor = value.style.color;

                value.textContent = '已复制!';
                value.style.color = 'var(--success)';

                setTimeout(() => {
                    value.textContent = originalText;
                    value.style.color = originalColor;
                }, 1500);
            });
        });
    });

    // 技能分类卡片交互
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            category.style.transform = 'translateX(5px)';
        });

        category.addEventListener('mouseleave', () => {
            category.style.transform = 'translateX(0)';
        });
    });

    // 头部头像动态效果
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.addEventListener('mouseenter', () => {
            avatar.style.transform = 'scale(1.1) rotate(5deg)';
        });

        avatar.addEventListener('mouseleave', () => {
            avatar.style.transform = 'scale(1) rotate(0)';
        });
    }

    // 页面平滑滚动（如果有导航）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 添加打印样式支持
    const printButton = () => {
        const style = document.createElement('style');
        style.textContent = `
            @media print {
                body {
                    background: white;
                    padding: 0;
                }
                .container {
                    box-shadow: none;
                    border: 1px solid #e2e8f0;
                }
                .contact-card {
                    page-break-inside: avoid;
                }
            }
        `;
        document.head.appendChild(style);
    };

    printButton();
});
