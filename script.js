
const display = document.getElementById('display');

// إضافة إدخال للشاشة
function appendCharacter(char) {
    if (display.innerText === '0' && char !== '.') {
        display.innerText = char;
    } else {
        display.innerText += char;
    }
}

// مسح الشاشة بالكامل (Escape)
function clearDisplay() {
    display.innerText = '0';
}

// حذف آخر رقم (Backspace)
function deleteLast() {
    if (display.innerText.length === 1 || display.innerText === 'Error') {
        display.innerText = '0';
    } else {
        display.innerText = display.innerText.slice(0, -1);
    }
}

// حساب النتيجة (Enter أو =)
function calculateResult() {
    try {
        let expression = display.innerText;
        // استبدال النسبة المئوية بقسمة على 100
        expression = expression.replace(/%/g, '/100');
        
        let result = eval(expression);
        
        if (result === Infinity || isNaN(result)) {
            display.innerText = 'Error';
        } else {
            // التعامل مع الأعداد العشرية الطويلة
            display.innerText = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
        }
    } catch (error) {
        display.innerText = 'Error';
    }
}

// إضافة دعم اختصارات لوحة المفاتيح (Keyboard Shortcuts)
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendCharacter(key);
    } else if (key === '.') {
        appendCharacter('.');
    } else if (key === '+') {
        appendCharacter('+');
    } else if (key === '-') {
        appendCharacter('-');
    } else if (key === '*') {
        appendCharacter('*');
    } else if (key === '/') {
        event.preventDefault(); // منع البحث السريع في بعض المتصفحات
        appendCharacter('/');
    } else if (key === '%') {
        appendCharacter('%');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculateResult();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});
