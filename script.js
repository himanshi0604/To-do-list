 const inp = document.getElementById('myInput');
        const addBtn = document.getElementById('add');
        const list = document.getElementById('myList');
        
        function refresh() {
            const all = document.querySelectorAll('#myList li').length;
            const ok = document.querySelectorAll('#myList li input:checked').length;
            document.getElementById('num1').innerText = all;
            document.getElementById('num3').innerText = ok;
            document.getElementById('num2').innerText = all - ok;
        }

        function setup(li) {
            const cb = li.querySelector('input[type="checkbox"]');
            cb.addEventListener('change', function() {
                if (this.checked) {
                    li.classList.add('done');
                } else {
                    li.classList.remove('done');
                }
                refresh();
            });
        }

        document.querySelectorAll('#myList li').forEach(setup);

        addBtn.addEventListener('click', () => {
            const val = inp.value.trim();
            if (val === "") return;

            const p = document.querySelector('input[name="prio"]:checked').value;
            const isH = p === 'High';
            const sym = isH ? '⚠' : '●';

            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox"> 
                <span class="icon">${sym}</span> 
                <span class="txt">${val}</span> 
                <span class="check-mark">✓</span>
            `;

            if (isH) {
                list.prepend(li);
            } else {
                list.appendChild(li);
            }

            setup(li);
            inp.value = "";
            refresh();
        });

        inp.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addBtn.click();
            }
        });

        document.getElementById('finish').addEventListener('click', () => {
            document.querySelectorAll('#myList li').forEach(li => {
                const cb = li.querySelector('input[type="checkbox"]');
                cb.checked = true;
                li.classList.add('done');
            });
            refresh();
        });

        document.getElementById('del').addEventListener('click', () => {
            list.innerHTML = "";
            refresh();
        });

        document.getElementById('clear').addEventListener('click', () => {
            document.querySelectorAll('#myList li.done').forEach(t => t.remove());
            refresh();
        });

        refresh();