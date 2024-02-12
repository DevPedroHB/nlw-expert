package dev.pedrohb.certification.modules.students.useCases;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.pedrohb.certification.modules.questions.entities.QuestionEntity;
import dev.pedrohb.certification.modules.questions.repositories.QuestionRepository;
import dev.pedrohb.certification.modules.students.dtos.StudentCertificationAnswerDTO;
import dev.pedrohb.certification.modules.students.dtos.VerifyHasCertificationDTO;
import dev.pedrohb.certification.modules.students.entities.AnswersCertificationsEntity;
import dev.pedrohb.certification.modules.students.entities.CertificationStudentEntity;
import dev.pedrohb.certification.modules.students.entities.StudentEntity;
import dev.pedrohb.certification.modules.students.repositories.CertificationStudentRepository;
import dev.pedrohb.certification.modules.students.repositories.StudentRepository;

@Service
public class StudentCertificationAnswersUseCase {
  @Autowired
  private StudentRepository studentRepository;
  @Autowired
  private QuestionRepository questionRepository;
  @Autowired
  private CertificationStudentRepository certificationStudentRepository;
  @Autowired
  private VerifyHasCertificationUseCase verifyHasCertificationUseCase;

  public CertificationStudentEntity execute(StudentCertificationAnswerDTO dto) throws Exception {
    var hasCertification = verifyHasCertificationUseCase.execute(new VerifyHasCertificationDTO(dto.getEmail(), dto.getTechnology()));

    if(hasCertification){
      throw new Exception("Você já tirou sua certificação!");
    }

    List<QuestionEntity> questionsEntity = questionRepository.findByTechnology(dto.getTechnology());
    List<AnswersCertificationsEntity> answersCertifications = new ArrayList<>();

    AtomicInteger correctAnswers = new AtomicInteger(0);

    dto.getQuestionsAnswers().stream().forEach(questionAnswer -> {
      var question = questionsEntity.stream().filter(q -> q.getId().equals(questionAnswer.getQuestionID())).findFirst().get();

      var findCorrectAlternative = question.getAlternatives().stream().filter(alternative -> alternative.isCorrect()).findFirst().get();

      if(findCorrectAlternative.getId().equals(questionAnswer.getAlternativeID())) {
        questionAnswer.setCorrect(true);
        correctAnswers.incrementAndGet();
      } else {
        questionAnswer.setCorrect(false);
      }

      var answersCertificationsEntity = AnswersCertificationsEntity.builder().answerID(questionAnswer.getAlternativeID()).questionID(questionAnswer.getQuestionID()).isCorrect(questionAnswer.isCorrect()).build();

      answersCertifications.add(answersCertificationsEntity);
    });

    var student = studentRepository.findByEmail(dto.getEmail());
    UUID studentID;

    if(student.isEmpty()) {
      var studentCreated = StudentEntity.builder().email(dto.getEmail()).build();

      studentCreated = studentRepository.save(studentCreated);

      studentID = studentCreated.getId();
    } else {
      studentID = student.get().getId();
    }

    CertificationStudentEntity certificationStudentEntity = CertificationStudentEntity.builder().technology(dto.getTechnology()).studentID(studentID).grade(correctAnswers.get()).build();

    var certificationStudentCreated = certificationStudentRepository.save(certificationStudentEntity);

    answersCertifications.stream().forEach(answerCertification -> {
      answerCertification.setCertificationID(certificationStudentEntity.getId());
      answerCertification.setCertificationStudentEntity(certificationStudentEntity);
    });

    certificationStudentEntity.setAnswersCertificationsEntities(answersCertifications);

    certificationStudentRepository.save(certificationStudentEntity);

    return certificationStudentCreated;
  }
}
