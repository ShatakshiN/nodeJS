document.addEventListener('DOMContentLoaded', () => {
    interface SendMsg {
        message: string;
        index?: number;
    }

    const form = document.getElementById('msgForm') as HTMLFormElement;
    const msgInput = form?.elements.namedItem('msg') as HTMLInputElement;
    if (!form || !msgInput) return;

    const parentElement = document.getElementById('messageList') as HTMLUListElement;
    if (!parentElement) return;

    
    function loadMessagesFromLocal() {
        const stored = localStorage.getItem("messages");
        if (!stored) return;

        const messages: SendMsg[] = JSON.parse(stored);
        messages.forEach(msg => showMsg(msg));
    }

    
    function saveMessagesToLocal() {
        const allMessages: SendMsg[] = Array.from(parentElement.querySelectorAll('li')).map(li => ({
            message: li.querySelector('.msg-text')!.textContent || '',
            index: Number(li.getAttribute('data-index'))
        }));
        localStorage.setItem("messages", JSON.stringify(allMessages));
    }

    
    async function sendData(event: SubmitEvent) {
        event.preventDefault();
        const userMsg = msgInput.value.trim();
        if (!userMsg) return;

        const sendmsg: SendMsg = { message: userMsg };

        try {
            const response = await fetch('http://localhost:4000/home', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sendmsg)
            });

            const data: SendMsg = await response.json(); 
            msgInput.value = "";
            showMsg(data);
            saveMessagesToLocal();
        } catch (err) {
            console.error(err);
        }
    }

    
    function showMsg(sendmsg: SendMsg) {
        const childElement = document.createElement('li');
        childElement.setAttribute("data-index", String(sendmsg.index ?? 0));
        childElement.className = "list-group-item d-flex justify-content-between align-items-center";

        const msgSpan = document.createElement('span');
        msgSpan.className = "msg-text";
        msgSpan.textContent = sendmsg.message;


        const delButton = document.createElement('button');
        delButton.textContent = 'DELETE';
        delButton.className = "btn btn-danger btn-sm ms-3";
        delButton.addEventListener("click", async () => {
            try {
                const response = await fetch(`http://localhost:4000/home/${sendmsg.index}`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    parentElement.removeChild(childElement);
                    saveMessagesToLocal();
                }
            } catch (err) {
                console.error("Delete failed", err);
            }
        });

        
        const editButton = document.createElement('button');
        editButton.textContent = 'EDIT';
        editButton.className = "btn btn-warning btn-sm ms-3";
        editButton.addEventListener("click", async () => {
            msgInput.value = sendmsg.message; 

            try {
                
                const response = await fetch(`http://localhost:4000/home/${sendmsg.index}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(sendmsg),
                });
                const data: SendMsg = await response.json();

                if (response.ok) {
                    const li = parentElement.querySelector(`li[data-index="${sendmsg.index}"]`);
                    if (li) li.querySelector('.msg-text')!.textContent = data.message;
                    saveMessagesToLocal();
                }
            } catch (err) {
                console.error(err);
            }
        });

        childElement.appendChild(msgSpan);
        childElement.appendChild(editButton);
        childElement.appendChild(delButton);
        parentElement.appendChild(childElement);
    }

    form.addEventListener("submit", sendData);


    loadMessagesFromLocal();
});
