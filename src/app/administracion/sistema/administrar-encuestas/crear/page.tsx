"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack, Typography, IconButton } from "@mui/material";
import Input from "@/components/Input";
import Button from "@/components/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Wrapper from "@/components/Wrapper";
import Breadcrumbs from "@/components/Breadcrumbs";

interface SurveyForm {
  key: string;
  name: string;
  countryCode: string;
  description: string;
}

interface Option {
  text: string;
  value: string;
}

interface QuestionForm {
  key: string;
  text: string;
  description: string;
  options: Option[];
}

const surveySchema = yup.object().shape({
  key: yup.string().required("La clave es obligatoria"),
  name: yup.string().required("El nombre es obligatorio"),
  countryCode: yup.string().required("El código de país es obligatorio"),
  description: yup.string().required("La descripción es obligatoria"),
});

export default function CreateSurveyForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SurveyForm>({
    resolver: yupResolver(surveySchema),
    mode: "onChange",
  });

  const [questions, setQuestions] = useState<QuestionForm[]>([]);
  const [surveySubmitted, setSurveySubmitted] = useState(false);

  const onSubmitSurvey = (data: SurveyForm) => {
    setSurveySubmitted(true);
    setQuestions([{ key: "", text: "", description: "", options: [] }]); // Inicializa la primera pregunta
  };

  const addQuestion = () => {
    setQuestions(prev => [...prev, { key: "", text: "", description: "", options: [] }]);
  };

  const handleQuestionChange = (index: number, question: QuestionForm) => {
    const newQuestions = [...questions];
    newQuestions[index] = question;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, option: Option) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = option;
    setQuestions(newQuestions);
  };

  const addOption = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push({ text: "", value: "" });
    setQuestions(newQuestions);
  };

  const removeQuestion = (questionIndex: number) => {
    console.log("Removing question at index:", questionIndex);
    setQuestions(prevQuestions => {
      const newQuestions = prevQuestions.filter((_, index) => index !== questionIndex);
      console.log("New questions array:", newQuestions);
      return newQuestions;
    });
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    setQuestions(
      questions.map((question, qIndex) => {
        if (qIndex === questionIndex) {
          return {
            ...question,
            options: question.options.filter((_, oIndex) => oIndex !== optionIndex),
          };
        }
        return question;
      })
    );
  };

  const submitSurvey = () => {
    const surveyData = { questions };
    console.log("Encuesta completa:", surveyData);
    // Enviar surveyData a la API
  };

  return (
    <Wrapper>
      <Breadcrumbs
        title="Crear encuesta"
        items={[
          { title: "Inicio", href: "/dashboard" },
          { title: "Administración" },
          { title: "Sistema", href: "/administracion/sistema" },
          { title: "Administrar encuestas", href: "/administracion/sistema/administrar-encuestas" },
          { title: "Crear encuesta" },
        ]}
      />
      <Grid
        container
        maxWidth={"860px"}
        sx={{
          gap: 3,
          maxWidth: "1000px",
          backgroundColor: "#fff",
          px: 3,
          py: 6,
          borderRadius: "16px",
          alignItems: "center",
          justifyContent: "center",
          mt: 3,
          mx: "auto",
        }}
      >
        <Grid
          container
          component="form"
          onSubmit={handleSubmit(onSubmitSurvey)}
          sx={{ gap: 3, mx: "auto", alignItems: "center", justifyContent: "center" }}
        >
          <Grid item>
            <Controller
              control={control}
              name="key"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Clave *"
                  type="text"
                  value={value}
                  onChange={onChange}
                  hint={errors.key?.message}
                  isValidField={!errors.key}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Nombre *"
                  type="text"
                  value={value}
                  onChange={onChange}
                  hint={errors.name?.message}
                  isValidField={!errors.name}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="countryCode"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Código de país *"
                  type="text"
                  value={value}
                  onChange={onChange}
                  hint={errors.countryCode?.message}
                  isValidField={!errors.countryCode}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Descripción *"
                  type="text"
                  value={value}
                  onChange={onChange}
                  hint={errors.description?.message}
                  isValidField={!errors.description}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Stack direction="row" justifyContent="center" spacing={2}>
              <Button text="Proceder" variant="primary" type="submit" disabled={!isValid} />
            </Stack>
          </Grid>
        </Grid>

        {surveySubmitted &&
          questions.map((question, questionIndex) => (
            <Grid key={questionIndex} container rowSpacing={3} columnSpacing={2} sx={{ mt: 4 }}>
              <Grid item xs={12}>
                <Typography variant="h6">Pregunta {questionIndex + 1}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Input
                  label="Clave *"
                  type="text"
                  value={question.key}
                  onChange={e => handleQuestionChange(questionIndex, { ...question, key: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  label="Texto *"
                  type="text"
                  value={question.text}
                  onChange={e => handleQuestionChange(questionIndex, { ...question, text: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  label="Descripción *"
                  type="text"
                  value={question.description}
                  onChange={e => handleQuestionChange(questionIndex, { ...question, description: e.target.value })}
                />
              </Grid>

              {question.options.map((option, optionIndex) => (
                <Grid key={optionIndex} container rowSpacing={3} columnSpacing={2} alignItems="center">
                  <Grid item xs={5}>
                    <Input
                      label="Texto de la opción"
                      type="text"
                      value={option.text}
                      onChange={e =>
                        handleOptionChange(questionIndex, optionIndex, { ...option, text: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Input
                      label="Valor de la opción"
                      type="text"
                      value={option.value}
                      onChange={e =>
                        handleOptionChange(questionIndex, optionIndex, { ...option, value: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton color="secondary" onClick={() => removeOption(questionIndex, optionIndex)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button text="Agregar opción" variant="secondary" onClick={() => addOption(questionIndex)} />
              </Grid>
              <Grid item xs={12}>
                <Button text="Eliminar Pregunta" variant="warning-red" onClick={() => removeQuestion(questionIndex)} />
              </Grid>
            </Grid>
          ))}

        {surveySubmitted && (
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 4 }}>
              <Button text="Agregar Pregunta" variant="secondary" onClick={addQuestion} />
              <Button text="Terminar Encuesta" variant="primary" type="button" onClick={submitSurvey} />
            </Stack>
          </Grid>
        )}
      </Grid>
    </Wrapper>
  );
}
