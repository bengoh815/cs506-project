# Requirements and Specification Document

## Melody Mapper

### Project Abstract

Melody Mapper is an application designed to convert voiced melodies into MIDI format. Users can input melodies through voice, and the application will transform them into MIDI representation, allowing for storage and playback. This functionality enables users to easily capture and manipulate melodies for various purposes, such as music composition, analysis, or playback.

### Customer

The target customer for this software spans musicians, composers, music producers, and enthusiasts who engage in the creation and manipulation of melodies. Specifically, individuals who seek efficient methods to transcribe melodies from voice to MIDI format for further exploration, modification, or integration into their creative projects would find this application valuable. Moreover, educators and students in music-related fields could benefit from its functionality for educational purposes, facilitating learning and experimentation with musical concepts.

### User Requirements

| ID   | Description                                                  | Priority | Status |
| ---- | ------------------------------------------------------------ | -------- | ------ |
| R01  | Users should be able to record audio to be converted into MIDI format. | High      | Open   |
| R02  | Users should be able to name, date, and author audio recordings that are converted to MIDI format. | High     | Open   |
| R03  | Users should be able to playback previously converted audio recordings in MIDI format. | High     | Open   |
| R04  | Users should be able to see MIDI converted audio recordings as sheet music. | Medium      | Open   |
| R05  | Users should be able to download the converted audio recording MIDI file. | Medium     | Open   |
| R06  | Users should be able to credit recordings to other users | Low | Open |
| R07  | Users should be able to create accounts and see their history of recordings. | Low | Open |

### Use Cases & User Stories

1. As the user of the websites, in order to record the recording, the user will be able to record, playback and download the audio they recorded.
    - Once the user is satified with the recording, the user will be prompted to name the recording, author the audio recording, and credit other users.
    - Once the user submits the recording for conversion, the resulting MIDI file will be returned and displayed as a music sheet.
2. As the user of the website, the user will be able to see a list of converted recordings.
    - The list contains all the converted recordings that all the users have created in the database.
3. As the user of the website, the user will be able to create an account.
4. As the user of the website, the user can see a history of the converted recordings they have done.
5. As the user of the website, the user will be able to download the converted audio recording in a MIDI file format.


### User Interface Requirements

Website without user account
1. A button with microphone icon for receiving live recording and convert into the format of .wav, .m4a, and .mp3
2. A button with file upload icon for allowing the uploads of recording files in the format of .wav, .m4a, and .mp3
3. History section to show the details of previous conversion with credited author and date

![User Interface Without User Account](Resources/User_Interface_Without_User_Account.png)

Website with user account
1. A button with microphone icon for receiving live recording and convert into the format of .wav, .m4a, and .mp3
2. A button with file upload icon for allowing the uploads of recording files in the format of .wav, .m4a, and .mp3
3. A button with user icon on the top right for user account
Three lines to show the content of the user account page
    a. Settings
    b. Conversion history from this user
4. History section to show the details of previous conversion with credited author and date

![User Interface With User Account](Resources/User_Interface_With_User_Account.png)

![User account](Resources/User_account.png)

### Security Requirements

- Our system will only start recording audio when the user have clicked the start recording button.
- Our system will only stop recording audio when the user have clicked the stop recording button.
- Our system will only store the MIDI file converted from audio recordings.
    - The system will state that the audio recordings will only be used for converting into the MIDI file.
    - MIDI files will be stored in the database and open for all users to see.
    - The system will not save audio recordings because users may want to avoid having their voice being recorded and stored on the system.
- Our system will be vulnerable to denial-of-service attacks.

### System Requirements

| Library |    Description    | Performance |
| ------ | ------- | ------ |
| Flask | A framework to work as a backend server | TBD |
| Mido |    A library to work with MIDI format files    | TBD |
| SQLAlchemy    |  A library for Python to work with SQL database | TBD |

### Specification

#### Technology Stack

1. HTML
2. CSS
3. Javascript
4. REST API
5. Flask (Python)
6. SQLAlchemy
7. MySQL
8. Docker

```mermaid
flowchart RL
subgraph Front End
	A(HTML \n CSS\n Javascript)
end
	
subgraph Back End
	B(Python: Flask)
end
	
subgraph Database
	C[(MySQL)]
end

A <-->|"REST API"| B
B <-->|SQLAlchemy| C
```

#### Database

```mermaid
---
title: Database ERD for MelodyMapper
---
erDiagram
    User ||--o{ Recording : "created by"

    User {
        int user_id PK
        string name
        string email
    }

    Recording {
        int recording_id PK
        string name
        int user_id FK
    }

```

#### Class Diagram

```mermaid
---
title: Class Diagram for MelodyMapper Program
---
classDiagram
    class User {
        - int user_id
        - String name
        - String email
        + User(int user_id, String name, String email)
        + void setUserID(int user_id)
        + String getUserID()
        + void setName(String name)
        + String getName()
        + void setEmail(String email)
        + String getEmail()
        + void getRecordings()
    }

    class Recording {
        - String name
        + Recording(String name)
        + void setName(String name)
        + String getName()
        + MIDI convert()
    }

    class MIDI {
        + MIDI(Recording recording)
    }
```

#### Flowchart

```mermaid
---
title: Program Flowchart
---
graph TD;
    Start([Start]) --> Input_Recording[/Input Recording \n/];
    Input_Recording --> Process_Recording[Process Recording];
    Process_Recording --> Validate_Recording{Validate Recording};
    Validate_Recording -->|Valid| Process_Valid_Recording[Process Valid Recording];
    Validate_Recording -->|Invalid| Error_Message[/Error Message/];
    Process_Valid_Recording --> Translate_Recording_to_MIDI[Translate Recording to MIDI];
    Translate_Recording_to_MIDI  --> Store_MIDI_File{Store MIDI File};
    Store_MIDI_File -->|Valid| Success_Message[/Success Message/];
    Store_MIDI_File -->|Invalid| Error_Message[/Error Message/];
    Translate_Recording_to_MIDI --> Display_MIDI[/Display MIDI to player/];
    Display_MIDI --> End([End]);
    Success_Message --> End;
    Error_Message --> End;
```

#### Behavior

```mermaid
---
title: State Diagram For MelodyMapper Application
---
stateDiagram
    [*] --> Ready
    Ready --> Recording : Start Recording
    Recording --> Validate : Validate Recording
    Validate --> Conversion : Convert Recording
    Validate --> ValidateError : Validation Error
    ValidateError --> Ready : Restart
    RecordingError --> Ready : Restart
    Recording --> RecordingError : Recording Error
    Conversion --> Ready : Display MIDI
    Conversion --> Store : Save MIDI
    Store --> Ready : Storing success
    Store --> StoreError : Storing error
    StoreError --> Ready : Display saving failed
```

#### Sequence Diagram

```mermaid
sequenceDiagram
participant Frontend
participant FlaskBackend
participant MySQLDatabase

Frontend ->> FlaskBackend: HTTP Request (e.g., GET /api/recordings)
activate FlaskBackend
Frontend ->> FlaskBackend: HTTP Request (e.g., POST /api/recordings)

FlaskBackend ->> MySQLDatabase: Query (SELECT * FROM Recording)
activate MySQLDatabase
FlaskBackend ->> MySQLDatabase: Query (SELECT * FROM User)
FlaskBackend ->> MySQLDatabase: Query (INSERT INTO Recording)
FlaskBackend ->> MySQLDatabase: Query (INSERT INTO User)

MySQLDatabase -->> FlaskBackend: Result Set
deactivate MySQLDatabase

FlaskBackend -->> Frontend: JSON Response
deactivate FlaskBackend
```

### Standards & Conventions

This portion of the document outlines the coding standards and conventions that are used in this project.

#### Coding Standards

The team prioritized the following coding standards during development:

1. **Simplicity:** Keep code simple which makes the code easier to understand, debug, and maintain.
2. **Modularity:** Encourages breaking down code into small, cohesive modules or functions that perform specific tasks.
3. **Scalability:** Write code that can scale to accommodate future growth in terms of efficiency and complexity.
4. **Consistency:** Enforce consistent naming conventions, formatting styles, and coding practices across the codebase.

#### Formatting Conventions

For Front End software development we use the VSCode extension [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) in its default configuration. 
Back End development uses the VSCode extension [autopep8](https://marketplace.visualstudio.com/items?itemName=ms-python.autopep8) in its default configuration. 
These extensions provide out of the box solutions that are lightweight and easy to use.

You can also read more about the Python PEP 8 standard [here](https://peps.python.org/pep-0008/).

#### Naming Conventions

1. Compound names should use upper case letters to mark the beginning of the next word likeThis and LikeThisToo
2. Names of user-defined types (files, classes, or enumerated types) should begin with upper case letters LikeThis or This
3. Names of functions, including class methods, should begin with lower case letters likeThis or this
4. Names of variables should begin with a lower case letter likeThis or this
5. Names of types and functions should be chosen to be self-documenting
6. Names of meaningful variables should be chosen to be self-documenting. Names of variables whose function is internally important only, such as loop counters, should be simple.

#### Comment Conventions

1. **JavaScript:** For JavaScript functions, use JSDoc-style comments to provide documentation for functions. This includes a description of what the function does, parameters it accepts, and the return value.
```
/**
 * Calculate the sum of two numbers.
 * 
 * @param {number} num1 - The first number.
 * @param {number} num2 - The second number.
 * @returns {number} The sum of num1 and num2.
 */
function sum(num1, num2) {
    return num1 + num2;
}
```

2. **Python:** For Python functions, use docstrings to document the purpose, parameters, and return values of the function.
```
def calculate_sum(num1, num2):
    """
    Calculate the sum of two numbers.
    
    Args:
        num1 (int): The first number.
        num2 (int): The second number.
    
    Returns:
        int: The sum of num1 and num2.
    """
    return num1 + num2

```

3. **TODO Comments:** Use TODO comments to mark areas of code that need improvement or additional work. Include a brief description of what needs to be done and any relevant context.
