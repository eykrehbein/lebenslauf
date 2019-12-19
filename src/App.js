import React, { Component } from 'react';

// import UI lib
import './assets/ui.css';

import './App.scss';

// import font awesome
import '@fortawesome/fontawesome-free/css/all.css';

import RootContainer from './components/RootContainer/RootContainer';
import Card from './components/Card/Card';
import EditableValue from './components/EditableValue/EditableValue';
import AddEducation from './components/AddEducation/AddEducation';
import Modal from './components/Modal/Modal';
import ModalSubmitButton from './components/ModalSubmitButton/ModalSubmitButton';
import EducationItem from './components/EducationItem/EducationItem';

export default class AppComponent extends Component {
  constructor() {
    super();
    this.state = {
      educations: [],
      showModal: false,
      modalType: 'addEducation'
    };
  }
  componentDidMount() {
    this.getEducations();
  }

  getEducations() {
    const val = localStorage.getItem('cpj:educations');
    console.log(val);
    if (val !== null) {
      this.setState({
        educations: JSON.parse(val).educations
      });
    }
  }

  addEducation() {
    const educationType = localStorage.getItem('cpj:temp_education');
    const school = localStorage.getItem('cpj:temp_school');
    const subject = localStorage.getItem('cpj:temp_subject');
    const educationStart = localStorage.getItem('cpj:temp_education-start');
    const educationEnd = localStorage.getItem('cpj:temp_education-end');
    const grade = localStorage.getItem('cpj:temp_grade');

    let educationTypeString;
    switch (Number(educationType)) {
      case 0:
        educationTypeString = 'Allgemeine Hochschulereife (Abitur)';
        break;
      case 1:
        educationTypeString = 'Bachelor';
        break;
      case 2:
        educationTypeString = 'Master';
        break;
      case 3:
        educationTypeString = 'Diplom';
        break;
      case 4:
        educationTypeString = 'Berufsausbildung';
        break;
      default:
        educationTypeString = 'Allgemeine Hochschulereife (Abitur)';
        break;
    }

    let educations;
    if (localStorage.getItem('cpj:educations')) {
      educations = JSON.parse(localStorage.getItem('cpj:educations'))
        .educations;
    } else {
      educations = [];
    }

    educations.push({
      educationType,
      educationTypeString,
      subject,
      school,
      educationStart,
      educationEnd,
      grade
    });

    this.setState({ educations });
    localStorage.setItem(
      'cpj:educations',
      JSON.stringify({ educations: educations })
    );

    localStorage.removeItem('cpj:temp_education');
    localStorage.removeItem('cpj:temp_school');
    localStorage.removeItem('cpj:temp_subject');
    localStorage.removeItem('cpj:temp_education-start');
    localStorage.removeItem('cpj:temp_education-end');
    localStorage.removeItem('cpj:temp_grade');

    this.triggerModal();
  }

  triggerEditEducation(educationItem, itemIndex) {
    this.triggerModal('editEducation');

    localStorage.setItem('cpj:temp_education', educationItem.educationType);
    localStorage.setItem('cpj:temp_school', educationItem.school);
    localStorage.setItem('cpj:temp_subject', educationItem.subject);
    localStorage.setItem(
      'cpj:temp_education-start',
      educationItem.educationStart
    );
    localStorage.setItem('cpj:temp_education-end', educationItem.educationEnd);
    localStorage.setItem('cpj:temp_grade', educationItem.grade);
    localStorage.setItem('cpj:selected_edit', itemIndex);
  }

  editEducation() {
    const index = localStorage.getItem('cpj:selected_edit');

    let educations = this.state.educations;

    const educationType = localStorage.getItem('cpj:temp_education');
    const school = localStorage.getItem('cpj:temp_school');
    const subject = localStorage.getItem('cpj:temp_subject');
    const educationStart = localStorage.getItem('cpj:temp_education-start');
    const educationEnd = localStorage.getItem('cpj:temp_education-end');
    const grade = localStorage.getItem('cpj:temp_grade');

    let educationTypeString;
    switch (Number(educationType)) {
      case 0:
        educationTypeString = 'Allgemeine Hochschulereife (Abitur)';
        break;
      case 1:
        educationTypeString = 'Bachelor';
        break;
      case 2:
        educationTypeString = 'Master';
        break;
      case 3:
        educationTypeString = 'Diplom';
        break;
      case 4:
        educationTypeString = 'Berufsausbildung';
        break;
      default:
        educationTypeString = 'Allgemeine Hochschulereife (Abitur)';
        break;
    }

    console.log(educationType);

    educations[index] = {
      educationType,
      educationTypeString,
      subject,
      school,
      educationStart,
      educationEnd,
      grade
    };

    this.setState({
      educations
    });

    localStorage.setItem(
      'cpj:educations',
      JSON.stringify({ educations: this.state.educations })
    );

    this.setState({ modalType: 'addEducation' });
    this.triggerModal();
  }

  removeEducation() {
    let _educations = this.state.educations;
    _educations.splice(localStorage.getItem('cpj:selected_edit'), 1);
    this.setState({
      educations: _educations
    });

    localStorage.setItem(
      'cpj:educations',
      JSON.stringify({ educations: this.state.educations })
    );

    this.setState({ modalType: 'addEducation' });
    this.triggerModal();
  }

  triggerModal(type) {
    this.setState({ modalType: type });

    if (this.state.showModal) {
      document.querySelector('body').style.overflowY = 'auto';
    } else {
      if (type === 'addEducation') {
        localStorage.removeItem('cpj:temp_education');
        localStorage.removeItem('cpj:temp_subject');
        localStorage.removeItem('cpj:temp_school');
        localStorage.removeItem('cpj:temp_education-start');
        localStorage.removeItem('cpj:temp_education-end');
        localStorage.removeItem('cpj:temp_grade');
      }

      document.querySelector('body').style.overflowY = 'hidden';
    }

    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    return (
      <div className="app">
        <RootContainer>
          <div className="title">
            <h1>Lebenslauf</h1>
          </div>

          <Card title="Über mich" splitContent="no">
            <EditableValue
              label="Name"
              defaultValue="Eyk Rehbein"
              inputClassifier="name"
            />
            <EditableValue
              label="Email Adresse"
              defaultValue="eykrehbein@gmail.com"
              inputClassifier="email"
            />
            <EditableValue
              label="Github Profil"
              defaultValue="eykrehbein"
              inputClassifier="github"
            />
            <EditableValue
              label="Geburtstag"
              defaultValue="19.11.2019"
              inputClassifier="birthday"
              isDatePicker={true}
            />
          </Card>

          <Card title="Ausbildungen">
            {this.state.educations.length === 0 ? (
              <AddEducation
                clickHandler={() => this.triggerModal('addEducation')}
                title="Du hast noch keine Ausbildung hinzugefügt."
              />
            ) : (
              <div className="educations">
                {this.state.educations.map((ed, index) => (
                  <EducationItem
                    educationItem={ed}
                    editClicked={() => this.triggerEditEducation(ed, index)}
                    key={index}
                  />
                ))}
                <div className="addEducationButton">
                  <button
                    className="button is-primary is-small"
                    style={{ marginTop: '15px' }}
                    onClick={() => this.triggerModal('addEducation')}
                  >
                    Ausbildung Hinzufügen
                  </button>
                </div>
              </div>
            )}
          </Card>
        </RootContainer>

        {this.state.showModal ? (
          <Modal>
            <Card
              title="Ausbildung"
              closeIcon={true}
              closeIconFunction={this.triggerModal.bind(this)}
            >
              <EditableValue
                label="Ausbildung"
                inputClassifier="temp_education"
                defaultSelectValue="0"
                isSelect={true}
              >
                <option value="0">Allgemeine Hochschulereife (Abitur)</option>
                <option value="1">Bachelor</option>
                <option value="2">Master</option>
                <option value="3">Diplom</option>
                <option value="4">Berufsausbildung</option>
              </EditableValue>

              <EditableValue
                label="Schule / Hochschule"
                placeholder="z.B. Karlsruher Institut für Technologie"
                inputClassifier="temp_school"
              />

              <EditableValue
                label="Fach"
                placeholder="z.B. Informatik"
                inputClassifier="temp_subject"
              />

              <div
                className="grid h-center"
                style={{ padding: '0px', margin: '0px' }}
              >
                <div className="cell is-half" style={{ marginLeft: '0px' }}>
                  <EditableValue
                    label="Von"
                    placeholder=""
                    inputClassifier="temp_education-start"
                    isDatePicker={true}
                  />
                </div>
                <div
                  className="cell is-half"
                  style={{
                    marginLeft: '10px',
                    paddingRight: '0px',
                    marginRight: '0px'
                  }}
                >
                  <EditableValue
                    label="Bis"
                    placeholder=""
                    inputClassifier="temp_education-end"
                    isDatePicker={true}
                  />
                </div>
              </div>

              <EditableValue
                label="Abschlussnote"
                placeholder="z.B. 1.3"
                inputClassifier="temp_grade"
              />

              {this.state.modalType === 'editEducation' ? (
                <div class="cell inline-buttons">
                  <ModalSubmitButton
                    clickHandler={this.removeEducation.bind(this)}
                    buttonText="Löschen"
                    color="danger"
                    marginRight="10px"
                  />
                  <ModalSubmitButton
                    clickHandler={this.editEducation.bind(this)}
                    buttonText="Speichern"
                    color="success"
                  />
                </div>
              ) : (
                <div class="cell">
                  <ModalSubmitButton
                    clickHandler={this.addEducation.bind(this)}
                    buttonText="Hinzufügen"
                    color="primary"
                  />
                </div>
              )}
            </Card>
          </Modal>
        ) : null}
      </div>
    );
  }
}
