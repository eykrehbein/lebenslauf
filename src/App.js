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
import PEItem from './components/PEItem/PEItem';
import SkillsInput from './components/SkillsInput/SkillsInput';
import SkillsList from './components/SkillsList/SkillsList';

export default class AppComponent extends Component {
  constructor() {
    super();
    this.state = {
      educations: [],
      pe: [],
      showModal: false,
      modalType: 'addEducation',
      skills: []
    };
  }
  componentDidMount() {
    this.getEducations();
    this.getPE();
    this.getSkills();
  }

  getEducations() {
    const val = localStorage.getItem('cpj:educations');

    if (val !== null) {
      this.setState({
        educations: JSON.parse(val).educations
      });
    }
  }

  getPE() {
    const val = localStorage.getItem('cpj:pe');

    if (val !== null) {
      this.setState({
        pe: JSON.parse(val).pe
      });
    }
  }

  getSkills() {
    const val = localStorage.getItem('cpj:skills');

    if (val !== null) {
      this.setState({
        skills: JSON.parse(val).skills
      });
    }
  }

  addPE() {
    // deutsche variablen aus Zeitdruck und der Einfachheit halber
    // sonst natürlich nicht gemischt.
    const stellenbezeichnung = localStorage.getItem(
      'cpj:temp_pe_stellenbezeichnung'
    );
    const unternehmen = localStorage.getItem('cpj:temp_pe_unternehmen');
    const anstellungsartIndex = localStorage.getItem(
      'cpj:temp_pe_anstellungsart'
    );
    const start = localStorage.getItem('cpj:temp_pe_start');
    const end = localStorage.getItem('cpj:temp_pe_end');
    const standort = localStorage.getItem('cpj:temp_pe_standort');

    let anstellungsartString;
    switch (Number(anstellungsartIndex)) {
      case 0:
        anstellungsartString = 'Vollzeit';
        break;
      case 1:
        anstellungsartString = 'Teilzeit';
        break;
      case 2:
        anstellungsartString = 'Praktikum';
        break;
      case 3:
        anstellungsartString = 'Werksstudent';
        break;
      default:
        anstellungsartString = 'Vollzeit';
        break;
    }

    let pe;
    if (localStorage.getItem('cpj:pe')) {
      pe = JSON.parse(localStorage.getItem('cpj:pe')).pe;
    } else {
      pe = [];
    }

    pe.push({
      stellenbezeichnung,
      unternehmen,
      anstellungsartIndex,
      anstellungsartString,
      start,
      end,
      standort
    });

    this.setState({ pe });
    localStorage.setItem('cpj:pe', JSON.stringify({ pe: pe }));

    localStorage.removeItem('cpj:temp_pe_stellenbezeichnung');
    localStorage.removeItem('cpj:temp_pe_unternehmen');
    localStorage.removeItem('cpj:temp_pe_anstellungsart');
    localStorage.removeItem('cpj:temp_pe_start');
    localStorage.removeItem('cpj:temp_pe_end');
    localStorage.removeItem('cpj:temp_pe_standort');

    this.triggerModal();
  }

  triggerEditPE(peItem, itemIndex) {
    this.triggerModal('editPE');

    localStorage.setItem(
      'cpj:temp_pe_stellenbezeichnung',
      peItem.stellenbezeichnung
    );
    localStorage.setItem('cpj:temp_pe_unternehmen', peItem.unternehmen);
    localStorage.setItem(
      'cpj:temp_pe_anstellungsart',
      peItem.anstellungsartIndex
    );
    localStorage.setItem('cpj:temp_pe_start', peItem.start);
    localStorage.setItem('cpj:temp_pe_end', peItem.end);
    localStorage.setItem('cpj:temp_pe_standort', peItem.standort);
    localStorage.setItem('cpj:selected_edit', itemIndex);
  }

  removePE() {
    let _pe = this.state.pe;
    _pe.splice(localStorage.getItem('cpj:selected_edit'), 1);
    this.setState({
      pe: _pe
    });

    localStorage.setItem('cpj:pe', JSON.stringify({ pe: this.state.pe }));

    this.setState({ modalType: 'addPE' });
    this.triggerModal();
  }

  editPE() {
    const index = localStorage.getItem('cpj:selected_edit');

    let pe = this.state.pe;

    const stellenbezeichnung = localStorage.getItem(
      'cpj:temp_pe_stellenbezeichnung'
    );
    const unternehmen = localStorage.getItem('cpj:temp_pe_unternehmen');
    const anstellungsartIndex = localStorage.getItem(
      'cpj:temp_pe_anstellungsart'
    );
    const start = localStorage.getItem('cpj:temp_pe_start');
    const end = localStorage.getItem('cpj:temp_pe_end');
    const standort = localStorage.getItem('cpj:temp_pe_standort');

    let anstellungsartString;
    switch (Number(anstellungsartIndex)) {
      case 0:
        anstellungsartString = 'Vollzeit';
        break;
      case 1:
        anstellungsartString = 'Teilzeit';
        break;
      case 2:
        anstellungsartString = 'Praktikum';
        break;
      case 3:
        anstellungsartString = 'Werksstudent';
        break;
      default:
        anstellungsartString = 'Vollzeit';
        break;
    }

    pe[index] = {
      stellenbezeichnung,
      unternehmen,
      anstellungsartIndex,
      anstellungsartString,
      start,
      end,
      standort
    };

    this.setState({
      pe
    });

    localStorage.setItem('cpj:pe', JSON.stringify({ pe: this.state.pe }));

    this.setState({ modalType: 'addPE' });
    this.triggerModal();
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

  addSkill(skill) {
    let allSkills = this.state.skills;

    allSkills.push(skill);
    this.setState({ skills: allSkills });
    localStorage.setItem(
      'cpj:skills',
      JSON.stringify({ skills: this.state.skills })
    );
  }

  deleteSkill(index) {
    let allSkills = this.state.skills;
    allSkills.splice(index, 1);
    this.setState({ skills: allSkills });
    localStorage.setItem(
      'cpj:skills',
      JSON.stringify({ skills: this.state.skills })
    );
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
              defaultValue=""
              inputClassifier="name"
            />
            <EditableValue
              label="Email Adresse"
              defaultValue=""
              inputClassifier="email"
            />
            <EditableValue
              label="Github Profil"
              defaultValue=""
              inputClassifier="github"
            />
            <EditableValue
              label="Geburtstag"
              defaultValue=""
              inputClassifier="birthday"
              isDatePicker={true}
            />
          </Card>

          <Card title="Ausbildungen">
            {this.state.educations.length === 0 ? (
              <AddEducation
                clickHandler={() => this.triggerModal('addEducation')}
                title="Du hast noch keine Ausbildung hinzugefügt."
                buttonText="Ausbildung hinzufügen"
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
                    Ausbildung hinzufügen
                  </button>
                </div>
              </div>
            )}
          </Card>

          <Card title="Praxiserfahrungen">
            {this.state.pe.length === 0 ? (
              <AddEducation
                clickHandler={() => this.triggerModal('addPE')}
                title="Du hast noch keine Praxiserfahrungen hinzugefügt."
                buttonText="Praxiserfahrung hinzufügen"
              />
            ) : (
              <div className="pe">
                {this.state.pe.map((pei, index) => (
                  <PEItem
                    peItem={pei}
                    editClicked={() => this.triggerEditPE(pei, index)}
                    key={index}
                  />
                ))}
                <div className="addEducationButton">
                  <button
                    className="button is-primary is-small"
                    style={{ marginTop: '15px' }}
                    onClick={() => this.triggerModal('addPE')}
                  >
                    Praxiserfahrung hinzufügen
                  </button>
                </div>
              </div>
            )}
          </Card>

          <Card title="Skills" splitContent="no">
            <SkillsInput
              placeholder="Skill hinzufügen"
              addSkillFunction={this.addSkill.bind(this)}
            />
            <SkillsList
              skills={this.state.skills}
              deleteItemFunction={this.deleteSkill.bind(this)}
            />
          </Card>
        </RootContainer>

        {this.state.showModal &&
        (this.state.modalType === 'addEducation' ||
          this.state.modalType === 'editEducation') ? (
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

        {this.state.showModal &&
        (this.state.modalType === 'addPE' ||
          this.state.modalType === 'editPE') ? (
          <Modal>
            <Card
              title="Praxiserfahrung"
              closeIcon={true}
              closeIconFunction={this.triggerModal.bind(this)}
            >
              <EditableValue
                label="Stellenbezeichnung"
                placeholder="z.B. Software Entwickler"
                inputClassifier="temp_pe_stellenbezeichnung"
              />
              <EditableValue
                label="Unternehmen"
                placeholder="z.B. Google"
                inputClassifier="temp_pe_unternehmen"
              />
              <EditableValue
                label="Anstellungsart"
                inputClassifier="temp_pe_anstellungsart"
                defaultSelectValue="0"
                isSelect={true}
              >
                <option value="0">Vollzeit</option>
                <option value="1">Teilzeit</option>
                <option value="2">Praktikum</option>
                <option value="3">Werksstudent</option>
              </EditableValue>

              <div
                className="grid h-center"
                style={{ padding: '0px', margin: '0px' }}
              >
                <div className="cell is-half" style={{ marginLeft: '0px' }}>
                  <EditableValue
                    label="Von"
                    placeholder=""
                    inputClassifier="temp_pe_start"
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
                    inputClassifier="temp_pe_end"
                    isDatePicker={true}
                  />
                </div>
              </div>

              <EditableValue
                label="Standort"
                placeholder="z.B. Karlsruhe"
                inputClassifier="temp_pe_standort"
              />

              {this.state.modalType === 'editPE' ? (
                <div class="cell inline-buttons">
                  <ModalSubmitButton
                    clickHandler={this.removePE.bind(this)}
                    buttonText="Löschen"
                    color="danger"
                    marginRight="10px"
                  />
                  <ModalSubmitButton
                    clickHandler={this.editPE.bind(this)}
                    buttonText="Speichern"
                    color="success"
                  />
                </div>
              ) : (
                <div class="cell">
                  <ModalSubmitButton
                    clickHandler={this.addPE.bind(this)}
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
