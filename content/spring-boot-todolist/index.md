---
emoji: 🍃
title: 'Spring Boot 배포 일지 (Feat. TodoList 프로젝트)'
date: '2022-11-8'
author: sjsjsj1246
tags: Spring
categories: 블로그
---

## 프로젝트 설계

스프링에 관심이 좀 있었는데 토이 프로젝트를 하면서 사용해 보기로 했습니다.

### 기능

| 종류          | 도메인 | uri             | method | body                               | response |
| ------------- | ------ | --------------- | ------ | ---------------------------------- | -------- |
| 투두목록 조회 | Todo   | /todo           | GET    | {tags:Tag[], start:Date, end:Date} | Todo[]   |
| 투두 추가     | Todo   | /todo           | POST   | Todo                               | Todo     |
| 투두 수정     | Todo   | /todo/:id       | PATCH  | Todo                               | Todo     |
| 투두 토글     | Todo   | /todo/toggle:id | PATCH  | null                               | Todo     |
| 투두 삭제     | Todo   | /todo/:id       | DELETE | null                               | null     |

```ts
type Todo = {
  id: number;
  title: string;
  content: string;
  modifiedDate: Date;
  isConplete: Boolean;
  tag: Tag[];
};

type Tag = "global" | "design" | "fe" | "be" | "mobile";
```

### 프로젝트 구조

Spring boot 사용, version 2.7.5
jpa, db는 mysql 8버전 사용

#### 종속성
```
dependencies {
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'mysql:mysql-connector-java'
}
```

#### application.properties
```
//DB 설정
spring.datasource.url={jdbc:mysql로 시작하는 디비주소}
spring.datasource.username={유저}
spring.datasource.password={패스워드}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

//JPA 설정
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect //MySQL 8버전 사용함
spring.jpa.database=mysql
spring.jpa.hibernate.ddl-auto=update
spring.jpa.hibernate.naming.strategy=org.hibernate.cfg.ImprovedNamingStrategy
spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
spring.jpa.generate-ddl=false
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.enable_lazy_load_no_trans=true
```

## 개발

### Domain 정의

인증도 없는 간단한 투두리스트 프로젝트이기 때문에 도메인은 Todo 하나 뿐입니다.

먼저 Entity를 작성해주었습니다.

```java
@Getter
@Setter
@Entity
public class Todo {

    @Id
    //PK를 지정해주었습니다.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //기본키 생성 전략을 MySQL에 맡깁니다. AUTO_INCREMENT로 생성될 것입니다.
    private Long id;

    private String title;

    private String content;

    private Boolean isComplete;

    @Enumerated(EnumType.STRING)
    private TagEnum tag;

    private LocalDate modifiedDate;

    public Todo() {

    }

    public Todo(String title, String content, TagEnum tag) {
        this.title = title;
        this.content = content;
        this.tag = tag;
        this.isComplete = Boolean.FALSE;
        this.modifiedDate = LocalDate.now();
    }

    public enum TagEnum {
        global, pm, design, fe, be, mobile
    }
}
```

### Repository

JPA의 repository를 정의해줍니다. 날짜를 통해 투두를 찾는 내부 메서드를 추가로 정의해주었습니다.

```java
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findAllByModifiedDateBetween(LocalDate start, LocalDate end);
}
```

### Controller

/todo에 6개의 endpoint를 정의해줍니다.

```java
@RestController
@RequestMapping("/todo")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @GetMapping
    public ResponseEntity<TodoListResponse> getTodoList(@RequestBody(required = false) TodoListRequest request) {
        return ResponseEntity.ok().body(todoService.getTodoList(request));
    }

    @PostMapping
    public ResponseEntity<TodoDto> createTodoList(@RequestBody TodoPatchRequest request) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(todoService.createTodo(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoDto> getTodo(@PathVariable @Valid Long id) {
        return ResponseEntity.ok().body(todoService.getTodo(id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TodoDto> updateTodo(@PathVariable @Valid Long id, @RequestBody TodoPatchRequest request) {
        return ResponseEntity.ok().body(todoService.updateTodo(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable @Valid Long id) {
        todoService.deleteTodo(id);
        return ResponseEntity.ok().body(null);
    }

    @PatchMapping("/toggle/{id}")
    public ResponseEntity<TodoDto> toggleTodo(@PathVariable @Valid Long id) {
        return ResponseEntity.ok().body(todoService.toggleTodo(id));
    }
}
```

#### DTO
DTO들을 정의해주었습니다.

```java
@Getter
@AllArgsConstructor
public class TodoDto {
    private Long id;

    private String title;

    private String content;

    private Boolean isComplete;

    private Todo.TagEnum tag;

    private LocalDate modifiedDate;

  // TodoDTO.from을 통해 todo를 쉽게 todoDTO로 바꿀 수 있습니다.
    public static TodoDto from(Todo todo) {
        return new TodoDto(
                todo.getId(),
                todo.getTitle(),
                todo.getContent(),
                todo.getIsComplete(),
                todo.getTag(),
                todo.getModifiedDate()
        );
    }
}

@Getter
@AllArgsConstructor
public class TodoListResponse {
    private int count;

    private List<TodoDto> todoList;

    public static TodoListResponse from(List<TodoDto> todoList) {
        return new TodoListResponse(todoList.size(), todoList);
    }
}

@Getter
@AllArgsConstructor
public class TodoPatchRequest {

    @NotNull
    private String title;

    private String content;

    private Todo.TagEnum tag;

    public Todo toEntity() {
        Todo todo = new Todo(title, content, tag);
        return todo;
    }
}

@Getter
@AllArgsConstructor
public class TodoListRequest {
    private List<Todo.TagEnum> tags;

    private LocalDate start;

    private LocalDate end;
}

```

### Service

서비스 코드들입니다.
```java
@RequiredArgsConstructor
@Service
public class TodoService {
    private final TodoRepository todoRepository;

    public TodoListResponse getTodoList(TodoListRequest request){
        List<Todo> todoList;

        if(request == null) return TodoListResponse.from(this.todoRepository.findAll().stream().map(TodoDto::from).toList());

        if(request.getStart() != null && request.getEnd() != null)
            todoList = this.todoRepository.findAllByModifiedDateBetween(request.getStart(), request.getEnd());
        else
            todoList = this.todoRepository.findAll();

        //태그 검사
        todoList =  todoList.stream().filter(todo -> request.getTags().contains(todo.getTag())).toList();

        return TodoListResponse.from(todoList.stream().map(TodoDto::from).toList());
    }

    public TodoDto createTodo(TodoPatchRequest request) throws IOException {
        return TodoDto.from(todoRepository.save(request.toEntity()));
    }

    public TodoDto getTodo(Long id) {
        return TodoDto.from(todoRepository.findById(id).orElseThrow(NotExistTodoException::new));
    }

    public TodoDto updateTodo(Long id, TodoPatchRequest request) {
        Todo todo = todoRepository.findById(id).orElseThrow(NotExistTodoException::new);
        todo.setTitle(request.getTitle());
        todo.setContent(request.getContent());
        todo.setTag(request.getTag());
        return TodoDto.from(todoRepository.save(todo));
    }

    public void deleteTodo(Long id){
        todoRepository.deleteById(id);
    }

    @Transactional
    public TodoDto toggleTodo(Long id){
        Todo todo = todoRepository.findById(id).orElseThrow(NotExistTodoException::new);
        todo.setIsComplete(!todo.getIsComplete());
        return TodoDto.from(todo);
    }

}
```

## 배포

우분투에 jdk, mysql, nginx를 설치해줍니다.

### Nginx 설정

저는 도메인을 가지고 있어서 여기로 연결하고자 했습니다.
A레코드로 todo.도메인.xx을 서버 주소로 매핑시켰습니다.

여기서 그치면 안되고 이 도메인으로 접속한 유저를 서버 내의 스프링 애플리케이션으로 포팅해줘야 합니다.

/etc/nginx/sites-available/todo.도메인.xx
```
server {
 listen 80;
 server_name todo.도메인.xx;

 location / {
  proxy_pass http://127.0.0.1:8080/;
  proxy_redirect off;
  proxy_set_header X-Forwarded-Host $host;
  proxy_set_header Host "todo.도메인.xx";
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Real-IP $remote_addr;
 }
}

```
그후 소프트링크 연결
sudo ln -s /etc/nginx/sites-available/todo.도메인.xx /etc/nginx/sites-enabled/todo.도메인.xx

sertbot으로 https 인증서 등록 
> 참고 https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04

### 빌드 및 실행

프로젝트 루트에서
1. ./gradlew build
2. nohup java -jar build/libs/빌드된_파일_이름.jar &
백그라운드로 스프링 부트 애플리케이션이 동작하게 됩니다.

  
프로세스를 종료하고싶다면
1. ps -ef | grep 빌드파일이름
   1. 이 명령어로 pid를 찾습니다.
2. kill -9 {pid}

---

얕은 지식으로 스프링 부트를 경험해보고 배포도 해봤습니다.
자세한 설명이 필요하신 부분 있다면 댓글 달아주세요

```toc

```
