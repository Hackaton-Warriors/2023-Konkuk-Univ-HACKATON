#install transformers, torch

from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

tokenizer = AutoTokenizer.from_pretrained("gogamza/kobart-summarization")
model = AutoModelForSeq2SeqLM.from_pretrained("gogamza/kobart-summarization")

def model(content):
    news_text = content
    input_ids = tokenizer.encode(news_text)
    
    input_ids = [tokenizer.bos_token_id] + input_ids + [tokenizer.eos_token_id]
    input_ids = torch.tensor([input_ids])
    
    summary_text_ids = model.generate(
    input_ids=input_ids,
    bos_token_id=model.config.bos_token_id,
    eos_token_id=model.config.eos_token_id,
    length_penalty=1, # 길이에 대한 penalty값. 1보다 작은 경우 더 짧은 문장을 생성하도록 유도하며, 1보다 클 경우 길이가 더 긴 문장을 유도
    max_length=128,     # 요약문의 최대 길이 설정
    min_length=32,      # 요약문의 최소 길이 설정
    num_beams=4,        # 문장 생성시 다음 단어를 탐색하는 영역의 개수 
    )

    return (tokenizer.decode(summary_text_ids[0], skip_special_tokens=True))