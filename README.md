# TaskHub (still under development)
Taskhub is a project for egbert's portofolio by using next.js as frontend and golang as backend. DB using postgreSql (learnt by documentation and chatgpt)

Initial page:
<br>
<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/3f78d57b-860e-41f5-846d-f2254f47a009" />

Login Page:
<br>
<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/79115640-e4e7-4d8b-8c6d-f8b89112895a" />
<br>
if turns wrong user or password :
<br>
<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/1bc793c2-f14d-420f-bcae-33e35cc2e59f" />

Register Page:
<br>
<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/f1b85e4c-6a26-4dec-b1c2-f2c5875fe953" />


For authentication form, all the input is required:
<br>
<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/ae1132d6-ffb1-402a-a165-5c51efb55bd4" />

try this for login:
<br>
pass is hashed but it is Test123.
<br>
<img width="500" height="24" alt="image" src="https://github.com/user-attachments/assets/374188cd-cb43-49b9-a1a9-697376d46840" />
<br>
Login successful
<br>
<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/bee5c8da-6b34-4bce-a992-62a9166eb3bd" />
<br>
all authentication uses this cookie even in the middleware, Cookie also will expires every 1 hour and it is automatically logout
<br>
<img width="412" height="28" alt="image" src="https://github.com/user-attachments/assets/bd73d3b8-a9df-4543-8f66-7ffa1c574f3c" />
<br>
the dashboard contains information of the task status and task table

create task feature:
<br>
<img width="456" height="376" alt="image" src="https://github.com/user-attachments/assets/bb47ff82-486b-4fad-ae77-9b08d27fb90d" />
<br>
Task creation input are all required. 
<br>
DB of task:
<br>
<img width="965" height="29" alt="image" src="https://github.com/user-attachments/assets/4d0a5894-b108-4d43-a7cd-a3daeddc0ef2" />
<br>
task created successfully and the table is automatically refresh to get the latest data: 
<br>
<img width="1331" height="728" alt="image" src="https://github.com/user-attachments/assets/0b63b315-80f0-431e-8dba-43d9b70e9bc4" />

user can updated status:
<img width="1119" height="482" alt="image" src="https://github.com/user-attachments/assets/ce73278f-b3fc-49e9-a59b-ac7d19cc2491" />

if assign to is none, when updated automatically turns to the user that changed it:
<img width="964" height="67" alt="image" src="https://github.com/user-attachments/assets/323b888d-00b6-48c2-ab19-a7f32563ed17" />

Pagination:
<img width="1016" height="429" alt="image" src="https://github.com/user-attachments/assets/1d60b4a4-dec2-4ee6-832b-3bc6bd800edf" />

assignee select:
<img width="1000" height="324" alt="image" src="https://github.com/user-attachments/assets/1c3a1e26-920b-4fe5-a460-5e01ed194cef" />

