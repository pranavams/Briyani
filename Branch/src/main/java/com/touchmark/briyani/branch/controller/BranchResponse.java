package com.touchmark.briyani.branch.controller;

import java.util.List;

import com.touchmark.briyani.branch.bo.Branch;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BranchResponse {
	private List<Branch> branch;
}
